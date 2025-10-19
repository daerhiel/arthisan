import { _isNumberValue } from "@angular/cdk/coercion";
import { Sort } from "@angular/material/sort";
import { PageEvent } from "@angular/material/paginator";
import { BehaviorSubject, combineLatest, map, shareReplay } from "rxjs";

import { DataSourceBase, QueryFilters, QueryState } from "./data-source-base";

/**
 * A type representing a property path as an array of strings.
 */
export type Path = string[];

/**
 * A function that traverses an object and returns all property paths leading to primitive values.
 * @param value The object to traverse.
 * @returns An array of property paths leading to primitive values.
 * @typeparam T The type of the object.
 */
export type TraverserFn<T> = (value: T) => Path[];

/**
 * A function that accesses a property value from a object based on the specified path.
 * @param data The object to access.
 * @param path The property path to access.
 * @returns The value at the specified path if found; otherwise, undefined.
 * @typeparam T The type of the object.
 * @typeparam R The type of a property value.
 */
export type AccessorFn<T, R = unknown> = (data: T, path: Path) => R;

/**
 * A function that defines a predicate for filtering data.
 * @param value The current element being processed in the array.
 * @param index The index of the current element being processed in the array.
 * @returns True to keep the element, false otherwise.
 * @typeparam T The type of the object.
 */
export type PredicateFn<T> = (value: T, index?: number) => boolean;

/**
 * A factory function that creates a predicate function based on the provided search term.
 * @param term The search term to apply.
 * @returns A predicate function that can be used to filter data.
 * @typeparam T The type of the object.
 */
export type PredicateFactory<T> = (accessor: AccessorFn<T>, term: string) => PredicateFn<T>;

/**
 * A factory function that creates a predicate function based on the provided query filters.
 * @param filters The query filters to apply.
 * @returns A predicate function that can be used to filter data.
 * @typeparam T The type of the object.
 */
export type PredicateFilterFactory<T> = (filters: QueryFilters) => PredicateFn<T>;

/**
 * A function that defines a sorter for sorting data.
 * @param a The left element to compare.
 * @param b The right element to compare.
 * @returns A negative number if `a` should come before `b`, a positive number if `a` should
 * @typeparam T The type of the object.
 * come after `b`, or zero if they are equal.
 */
export type SorterFn<T> = (a: T, b: T) => number;

/**
 * A factory function that creates a sorter function based on the specified property and direction.
 * @param path The property path to sort by.
 * @param direction The sort direction ("asc" or "desc").
 * @returns A sorter function that can be used to sort data.
 * @typeparam T The type of the object.
 */
export type SorterFactory<T> = (path: string, direction: string) => SorterFn<T>;

/**
 * Gets all property descriptors of an object, including inherited ones.
 * @param object The object to get property descriptors from.
 * @returns An array of property descriptors.
 */
function getObjectProperties(object: object): [string, PropertyDescriptor][] {
  const properties = new Map<string, PropertyDescriptor>();
  const traverse = (prototype: object) => {
    if (!prototype || prototype === Object.prototype) {
      return;
    }
    traverse(Object.getPrototypeOf(prototype));
    for (const key of Object.getOwnPropertyNames(prototype)) {
      const descriptor = Object.getOwnPropertyDescriptor(prototype, key);
      if (descriptor && typeof descriptor.get === 'function') {
        properties.set(key, descriptor);
      }
    }
  };
  traverse(object);
  return Array.from(properties.entries());
}

/**
 * Traverses an object and returns all property paths leading to primitive values.
 * @param value The object to traverse.
 * @returns An array of property paths leading to primitive values.
 */
export function traverser<T>(value: T): Path[] {
  const paths: Path[] = [];
  const visited = new WeakSet<object>();
  const traverse = (object: unknown, ...path: Path) => {
    if (object) {
      switch (typeof object) {
        case 'boolean':
        case 'number':
        case 'bigint':
        case 'string':
          paths.push(path);
          break;

        case 'object':
          if (!visited.has(object) && !Array.isArray(object)) {
            visited.add(object);
            for (const [key, value] of Object.entries(object)) {
              traverse(value, ...path, key);
            }
            for (const [key, property] of getObjectProperties(object)) {
              property.get && traverse(property.get.call(object), ...path, key);
            }
          }
          break;
      }
    }
  };
  traverse(value);
  return paths;
}

/**
 * Gets the value at the specified path from the object.
 * @param data The object to access.
 * @param path The path to the property to access.
 * @returns The value at the specified path if found; otherwise, undefined.
 * @typeparam T The type of the object.
 */
export function accessor<T>(data: T, path: Path): unknown {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = path.reduce<any>((x, name) => x && x[name], data);

  if (_isNumberValue(value)) {
    const number = Number(value);
    return number < 9007199254740991 ? number : value;
  }

  return value;
}

/**
 * Compares two values for sorting.
 * @param a The first value to compare.
 * @param b The second value to compare.
 * @returns A negative number if `valueA` should come before `valueB`, a positive number if `valueA`
 * should come after `valueB`, or zero if they are equal.
 */
export function comparer(a: unknown, b: unknown): number {
  const aType = typeof a;
  const bType = typeof b;

  if (aType !== bType) {
    if (aType === 'number') {
      a += '';
    }
    if (bType === 'number') {
      b += '';
    }
  }

  let result = 0;
  if (a != null && b != null) {
    if (a > b) {
      result = 1;
    } else if (a < b) {
      result = -1;
    }
  } else if (a != null) {
    result = 1;
  } else if (b != null) {
    result = -1;
  }

  return result;
}

/**
 * A default filter predicate that checks if the filter string is contained
 * in any property of the object (case-insensitive).
 * @param traverser The function to traverse objects and get property paths.
 * @param accessor The function to access property values from objects.
 * @param term The search term to apply.
 * @returns A predicate function that can be used to filter data.
 * @typeparam T The type of the object.
 */
export function predicate<T>(traverser: TraverserFn<T>, accessor: AccessorFn<T>, term: string): PredicateFn<T> {
  return (source: T) => {
    const paths = traverser(source);
    for (const path of paths) {
      const value = accessor(source, path);
      switch (typeof value) {
        case 'boolean':
        case 'number':
        case 'bigint':
          if (value.toString().includes(term.trim().toLowerCase())) {
            return true;
          }
          break;
        case 'string':
          if (value.toLowerCase().includes(term.trim().toLowerCase())) {
            return true;
          }
      }
    }
    return false;
  };
}

/**
 * Creates a sorter function based on the specified property and direction.
 * @param accessor The function to access property values from objects.
 * @param property The property to sort by.
 * @param direction The sort direction ("asc" or "desc").
 * @returns A sorter function that can be used to sort data.
 * @typeparam T The type of the object.
 */
export function sorter<T>(accessor: AccessorFn<T>, property?: string | null, direction?: string | null): SorterFn<T> {
  const path = property?.split(/[./]/).map(x => x.trim()) ?? [];
  return (a: T, b: T): number => {
    const valueA = accessor(a, path);
    const valueB = accessor(b, path);

    const result = comparer(valueA, valueB);

    return direction === 'desc' ? -result : result;
  };
}

/**
 * Represents the data source that manages a local array of data.
 * @param T The type of an array element.
 */
export class SyncDataSource<T> extends DataSourceBase<T> {
  readonly #data = new BehaviorSubject<T[]>([]);
  readonly #state = { reset: false };

  readonly #filtered = combineLatest([this.#data, this._states]).pipe(
    map(args => this.#filter(...args)),
    shareReplay(1)
  );

  readonly #sorted = combineLatest([this.#filtered, this._sort]).pipe(
    map(args => this.#sorter(...args)),
    shareReplay(1)
  );

  /** @inheritdoc */
  protected readonly _entries = combineLatest([this.#sorted, this._page]).pipe(
    map(args => this.#slicer(...args)),
    shareReplay(1)
  );

  /**
   * The data array managed by the data source.
   */
  get data() {
    return this.#data.value;
  }
  set data(data: T[]) {
    this.#data.next(Array.isArray(data) ? data : []);
  }

  /**
   * The traverser function used to get property paths from objects.
   */
  get traverser(): TraverserFn<T> {
    return this.#traverser;
  }
  set traverser(value: TraverserFn<T>) {
    this.#traverser = value ?? traverser;
  }
  #traverser: TraverserFn<T> = traverser;

  /**
   * The accessor function used to access property values from objects.
   */
  get accessor(): AccessorFn<T, unknown> {
    return this.#accessor;
  }
  set accessor(value: AccessorFn<T, unknown>) {
    this.#accessor = value ?? accessor;
  }
  #accessor: AccessorFn<T, unknown> = accessor;

  /**
   * The predicate filter factory function.
   */
  get predicate(): PredicateFilterFactory<T> | null {
    return this.#predicate;
  }
  set predicate(value: PredicateFilterFactory<T> | null) {
    this.#predicate = value;
  }
  #predicate: PredicateFilterFactory<T> | null = null;

  /**
   * Constructs a new instance of an array data source.
   * @param data The initial data array.
   */
  constructor(data: T[] = []) {
    super();
    data.length && this.#data.next(data);
  }

  #filter(data: T[], state: QueryState): T[] {
    const { query, query$, filters, filters$ } = state;
    if (query) {
      data = data.filter(predicate(this.#traverser, this.#accessor, query));
    }
    if (filters && this.#predicate) {
      data = data.filter(this.#predicate(filters));
    }
    if (query$ || filters$) {
      this.#state.reset = true;
    }
    return data;
  }

  #sorter(data: T[], sort: Sort | null): T[] {
    const { active, direction } = sort || {};
    if (active && direction) {
      data = [...data].sort(sorter(this.#accessor, active, direction));
    }
    return data;
  }

  #slicer(data: T[], page: PageEvent | null): T[] {
    if (this.#state.reset && page) {
      page.pageIndex = 0;
      this.#state.reset = false;
    }
    this._update(data.length, page);
    const { pageIndex, pageSize } = page || {};
    if (pageIndex != null && pageSize) {
      const start = pageIndex * pageSize;
      data = data.slice(start, start + pageSize);
    }
    return data;
  }

  /** @inheritdoc */
  override destroy(): void {
    this.#data.complete();
    super.destroy();
  }
}
