import { ChangeDetectionStrategy, Component, computed, effect, inject, InjectionToken, OnDestroy, signal, ViewChild } from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectTrigger } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { combineLatest, debounceTime, distinctUntilChanged, startWith, Subscription, tap } from 'rxjs';

import { getStorageItem, GetterFn, GroupingSet, PredicateFn, QueryFilters, setStorageItem, SyncDataSource, TranslateFn } from '@app/core';
import { CraftingCategory, CraftingRecipeData, ItemClass, ItemType, MasterItemDefinitions, TradingFamily } from '@app/nw-data';
import { getAccessor, NwI18n, NwRatio } from '@app/nw-buddy';
import { Artisan, ColumnPipe, ColumnsPipe, MATERIALS_STORAGE_KEY, MaterialsState, Production, supported } from '@features/artisan';
import { assemblyTable } from './assembly';

export const EXPLORE_ITEM_CATEGORIES = new InjectionToken<CraftingCategory[]>('EXPLORE_ITEM_CATEGORIES');
export const EXPLORE_ITEM_CLASSES = new InjectionToken<ItemClass[]>('EXPLORE_ITEM_CLASSES');

const APP_EXPLORER_FILTERS = 'explorer.filters';
const defaults = getStorageItem(APP_EXPLORER_FILTERS, {
  category: null,
  family: null,
  type: null,
  tradeable: false
});

/**
 * Creates a predicate function that filters an array based on the provided accessor and values.
 * @param accessor The accessor function to retrieve the value to filter on.
 * @param values The array of values to filter by.
 * @returns A predicate function that returns true if the value matches any of the filter values.
 */
function filterIncludes<T, R>(accessor: GetterFn<T, R>, values: R[]): PredicateFn<T> {
  return value => values.includes(accessor(value));
}

/**
 * Sets a filter function that checks if the value is included in the specified array.
 * @param filters The array of predicate functions to modify.
 * @param accessor The accessor function to retrieve the value to filter on.
 * @param value The array of values to filter by.
 */
function setFilterIncludes<T, R>(filters: PredicateFn<T>[], accessor: GetterFn<T, R>, value: unknown): void {
  if (value && Array.isArray(value) && value.length) {
    filters.push(filterIncludes(accessor, value));
  }
}

/**
 * Sets a filter function that checks if the value matches the specified condition.
 * @param filters The array of predicate functions to modify.
 * @param condition The condition function to apply.
 * @param value The value to check against the condition.
 */
function setConditionFilter<T>(filters: PredicateFn<T>[], condition: (value: T) => boolean, value: unknown): void {
  if (value) {
    filters.push(condition);
  }
}

/**
 * Creates a predicate function to filter productions based on the provided query filters.
 * @param filters The query filters to apply.
 * @returns A predicate function that determines if a production matches the filters.
 */
function getPredicate(filters: QueryFilters): PredicateFn<Production> {
  const conditions: PredicateFn<Production>[] = [];

  setFilterIncludes(conditions, x => x.entity.category, filters['category']);
  setFilterIncludes(conditions, x => x.entity.family, filters['family']);
  setFilterIncludes(conditions, x => x.entity.type, filters['type']);

  setConditionFilter(conditions, x => !x.entity.bindOnPickup, filters['tradeable']);

  if (conditions.length === 0) {
    return () => true;
  }

  return (production) => conditions.every(fn => fn(production));
}

@Component({
  selector: 'app-explorer',
  imports: [
    NgComponentOutlet, NgTemplateOutlet, ReactiveFormsModule,
    MatTableModule, MatSortModule, MatPaginatorModule,
    MatFormField, MatInput, MatSelect, MatSelectTrigger, MatOption, MatSlideToggle,
    MatButtonModule, MatIcon,
    ColumnsPipe, ColumnPipe, NwRatio
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
  templateUrl: './explorer.html',
  styleUrl: './explorer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Explorer implements OnDestroy {
  readonly #artisan = inject(Artisan);
  readonly #categories = inject(EXPLORE_ITEM_CATEGORIES, { optional: true }) ?? [];
  readonly #classes = inject(EXPLORE_ITEM_CLASSES, { optional: true }) ?? [];
  protected readonly _i18n = inject(NwI18n);
  readonly #subscriptions: Subscription[] = [];

  readonly #fields: Record<string, TranslateFn<string>> = {
    'entity.name': key => this._i18n.get(key),
    'entity.category': key => this._i18n.get(key, 'CategoryData'),
    'entity.family': key => this._i18n.get(key, 'CategoryData'),
    'entity.type': key => this._i18n.get(key, 'UI', 'UI_ItemTypeDescription'),
  };

  protected readonly _search = new FormControl<string | null>(null);
  protected readonly _category = new FormControl<CraftingCategory | null>(defaults.category);
  protected readonly _family = new FormControl<TradingFamily | null>(defaults.family);
  protected readonly _type = new FormControl<ItemType | null>(defaults.type);
  protected readonly _tradeable = new FormControl<boolean>(defaults.tradeable);
  protected readonly _pages = signal([15, 50, 100]);
  protected readonly _data = new SyncDataSource<Production>();
  protected readonly _craftables = assemblyTable;

  constructor() {
    this._data.traverser = () => assemblyTable.columns.map(column => column.id.split('.'));
    this._data.accessor = getAccessor(this._data.accessor, this.#fields);
    this._data.predicate = getPredicate;
    this.#subscriptions.push(this._search.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(200),
      tap(value => this._data.query = value)
    ).subscribe());
    this.#subscriptions.push(combineLatest([
      this._category.valueChanges.pipe(distinctUntilChanged(), startWith(this._category.value)),
      this._family.valueChanges.pipe(distinctUntilChanged(), startWith(this._family.value)),
      this._type.valueChanges.pipe(distinctUntilChanged(), startWith(this._type.value)),
      this._tradeable.valueChanges.pipe(distinctUntilChanged(), startWith(this._tradeable.value))
    ]).pipe(tap(([category, family, type, tradeable]) => {
      const filters = { category, family, type, tradeable };
      setStorageItem<QueryFilters>(APP_EXPLORER_FILTERS, filters);
      return this._data.filters = filters;
    })).subscribe());
  }

  readonly #data = computed(() => {
    const objects: Production[] = [];
    for (const key of this.#artisan.data.recipes.keys() ?? []) {
      const item = this.#artisan.data.items.get(key);
      const recipes = supported(this.#artisan.data.recipes.get(key));
      if (item && recipes?.length && !this._isExcluded(recipes) && this._isIncluded(item)) {
        const craftable = this.#artisan.getCraftable(key);
        craftable && objects.push(new Production(craftable));
      }
    }
    return objects;
  });

  protected readonly _categories = new GroupingSet<Production>(this.#data,
    x => x.entity.category,
    key => this._i18n.get(key, 'CategoryData'),
    x => x.margin
  );
  protected readonly _families = new GroupingSet<Production>(this.#data,
    x => x.entity.family,
    key => this._i18n.get(key, 'CategoryData'),
    x => x.margin
  );
  protected readonly _types = new GroupingSet<Production>(this.#data,
    x => x.entity.type,
    key => this._i18n.get(key, 'UI', 'UI_ItemTypeDescription'),
    x => x.margin
  );

  readonly #recover = effect(() => {
    const materials = getStorageItem<Record<string, MaterialsState>>(MATERIALS_STORAGE_KEY, {});
    const objects = this.#data();
    for (const object of objects) {
      const state = materials[object.entity.id];
      state && object.materials.setState(state);
    }
  });
  readonly #refresh = effect(() => {
    this._data.data = this.#data();
  });

  /**
   * Sets the MatSort instance for the data table.
   */
  @ViewChild(MatSort)
  set sort(sort: MatSort) {
    this._data.sort = sort;
  }

  /**
   * Sets the MatPaginator instance for the data table.
   */
  @ViewChild(MatPaginator)
  set paginator(paginator: MatPaginator) {
    this._data.paginator = paginator;
  }

  /** @inheritdoc */
  ngOnDestroy(): void {
    while (this.#subscriptions.length) {
      this.#subscriptions.shift()?.unsubscribe();
    }
    this.#recover.destroy();
    this.#refresh.destroy();
  }

  /**
   * Resets all filters to their default state.
   */
  protected _reset(): void {
    this._category.setValue(null);
    this._family.setValue(null);
    this._type.setValue(null);
    this._tradeable.setValue(false);
  }

  /**
   * Determines if the given recipes are excluded based on the current category filters.
   * @param recipes The list of crafting recipes to check.
   * @returns True if all recipes are excluded; otherwise, false.
   */
  private _isExcluded(recipes: CraftingRecipeData[]): boolean {
    return recipes.every(x => this.#categories.includes(x.CraftingCategory));
  }

  /**
   * Determines if the given item is included based on the current class filters.
   * @param item The crafting item to check.
   * @returns True if the item is included; otherwise, false.
   */
  private _isIncluded(item: MasterItemDefinitions): boolean {
    return this.#classes.every(name => item.ItemClass.includes(name));
  }
}
