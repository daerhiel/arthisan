import { EventEmitter } from "@angular/core";
import { DataSource } from "@angular/cdk/collections";
import { Sort, SortDirection } from "@angular/material/sort";
import { PageEvent } from "@angular/material/paginator";
import {
  BehaviorSubject, Subject, Observable, combineLatest, of,
  distinctUntilChanged, startWith, switchMap, scan, map
} from "rxjs";

export interface SorterSource {
  readonly sortChange: EventEmitter<Sort>;
  active: string;
  direction: SortDirection;
}

export interface PaginatorSource {
  page: Subject<PageEvent>;
  pageIndex: number;
  pageSize: number;
  length: number;
  firstPage(): void;
  lastPage(): void;
}

export type QueryFilters = Record<string, unknown>;

/**
 * A tuple representing the raw query parameters from data event stream sources.
 */
export type QueryParams = [
  string | null,
  QueryFilters | null,
  number
];

/**
 * The state of the data source query after processing.
 */
export interface QueryState {
  query: string | null;
  query$?: boolean;
  filters: QueryFilters | null;
  filters$?: boolean;
  version: number;
  version$?: boolean;
}

/**
 * Extracts the sorting information from the sorter source.
 * @param sort The sorter source.
 * @returns The extracted sorting information.
 */
function getSort(sort: SorterSource): Sort {
  const { active, direction } = sort;
  return { active, direction };
}

/**
 * Extracts the pagination information from the paginator source.
 * @param paginator The paginator source.
 * @returns The extracted pagination information.
 */
function getPage(paginator: PaginatorSource): PageEvent {
  const { pageIndex, pageSize, length } = paginator;
  return { pageIndex, pageSize, length };
}

/**
 * Converts raw query parameters from event stream sources into a query state object.
 * @param query The current query string.
 * @param filters The current set of filters.
 * @param version The current query version number.
 * @returns A constructed query state object.
 */
function convert([query, filters, version]: QueryParams): QueryState {
  return { query, filters, version };
}

/**
 * Compares and updates the previous and next query states.
 * @param prev The previous query state.
 * @param next The next query state.
 * @returns The updated query state.
 */
function iterate(prev: QueryState, next: QueryState): QueryState {
  next.query$ = prev.query != next.query;
  next.filters$ = !deepComparator(prev.filters, next.filters);
  next.version$ = prev.version != next.version;
  return next;
}

/**
 * Performs a deep comparison of two objects.
 * @param x The left object to compare.
 * @param y The right object to compare.
 * @returns True if the objects are equal; otherwise, false.
 */
export function deepComparator<T>(x: T, y: T): boolean {
  if (x === y) {
    return true;
  }
  if (typeof x !== typeof y || x == null || y == null) {
    return false;
  }
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime();
  }
  if (typeof x === 'object' && typeof y === 'object') {
    const keys = new Set<keyof T>();
    for (const key in x) {
      keys.add(key);
    }
    for (const key in y) {
      keys.add(key);
    }
    for (const key of keys) {
      if (!deepComparator(x[key], y[key])) {
        return false;
      }
    }
    return true;
  }
  return false;
}

/**
 * Represents the base data source implementation
 */
export abstract class DataSourceBase<T> extends DataSource<T> {
  readonly #query = new BehaviorSubject<string | null>(null);
  readonly #filters = new BehaviorSubject<QueryFilters | null>(null);
  readonly #sorter = new BehaviorSubject<SorterSource | null>(null);
  readonly #paginator = new BehaviorSubject<PaginatorSource | null>(null);
  readonly #refresh = new BehaviorSubject<number>(0);

  /**
   * The data view sorting stream.
   */
  protected readonly _sort = this.#sorter.pipe(
    distinctUntilChanged(),
    switchMap(sorter => sorter?.sortChange.pipe(
      startWith(getSort(sorter))
    ) ?? of(null))
  );

  /**
   * The data view page segmentation stream.
   */
  protected readonly _page = this.#paginator.pipe(
    distinctUntilChanged(),
    switchMap(paginator => paginator?.page.pipe(
      startWith(getPage(paginator))
    ) ?? of(null)),
  );

  /**
   * The data source entry stream delivered to subscribers upon connection.
   */
  protected abstract readonly _entries: Observable<T[]>;

  /**
   * The current filter query.
   */
  get query(): string | null {
    return this.#query.value;
  }
  set query(value: string | null) {
    this.#query.next(value);
  }

  /**
   * The current set of filters to apply.
   */
  get filters(): QueryFilters | null {
    return this.#filters.value;
  }
  set filters(value: QueryFilters | null) {
    this.#filters.next(value);
  }

  /**
   * The current sorter source.
   */
  get sort(): SorterSource | null {
    return this.#sorter.value;
  }
  set sort(value: SorterSource | null) {
    this.#sorter.next(value);
  }

  /**
   * The current paginator source.
   */
  get paginator(): PaginatorSource | null {
    return this.#paginator.value;
  }
  set paginator(value: PaginatorSource | null) {
    this.#paginator.next(value);
  }

  /**
   * The data query state stream.
   */
  protected readonly _states = combineLatest([
    this.#query.pipe(distinctUntilChanged(deepComparator)),
    this.#filters.pipe(distinctUntilChanged(deepComparator)),
    this.#refresh
  ]).pipe(map(convert), scan(iterate));

  /**
   * Updates the paginator state from the current data source state.
   * @param length The total count of data items.
   * @param page The current page event.
   */
  protected _update(length: number, page: PageEvent | null) {
    const paginator = this.#paginator.value;
    if (paginator && paginator.length !== length && page) {
      paginator.length = length;

      if (paginator.pageIndex > 0 || page.pageIndex != null) {
        const lastIndex = Math.max(Math.ceil(length / paginator.pageSize) - 1, 0);
        if (page.pageIndex == null || page.pageIndex > lastIndex) {
          page.pageIndex = Math.min(paginator.pageIndex, lastIndex);
        }
        if (page.pageIndex !== paginator.pageIndex) {
          paginator.pageIndex = page.pageIndex;
        }
      }
    }
  }

  /** @inheritdoc */
  override connect(): Observable<readonly T[]> {
    return this._entries;
  }

  /** @inheritdoc */
  override disconnect(): void {
    this.sort = null;
    this.paginator = null;
  }

  /**
   * Refreshes the data source.
   * @remarks This will re-apply the current filter, sort, and pagination settings.
   */
  refresh(): void {
    let version = this.#refresh.value;
    this.#refresh.next(++version);
  }

  /**
   * Destroys the data source and completes all observables.
   */
  destroy(): void {
    this.#refresh.complete();
    this.#paginator.complete();
    this.#sorter.complete();
    this.#filters.complete();
    this.#query.complete();
  }
}
