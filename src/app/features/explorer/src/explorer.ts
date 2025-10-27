import { ChangeDetectionStrategy, Component, computed, effect, inject, InjectionToken, OnDestroy, signal, ViewChild } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Subscription, tap } from 'rxjs';

import { getStorageItem, GroupingSet, SyncDataSource, TranslateFn } from '@app/core';
import { CraftingCategory, CraftingRecipeData, ItemClass, ItemType, MasterItemDefinitions, TradingFamily } from '@app/nw-data';
import { getAccessor, NwI18n, NwRatio } from '@app/nw-buddy';
import { Artisan, ColumnPipe, ColumnsPipe, MATERIALS_STORAGE_KEY, MaterialsState, Production, supported } from '@features/artisan';
import { assemblyTable } from './assembly';

export const EXPLORE_ITEM_CATEGORIES = new InjectionToken<CraftingCategory[]>('EXPLORE_ITEM_CATEGORIES');
export const EXPLORE_ITEM_CLASSES = new InjectionToken<ItemClass[]>('EXPLORE_ITEM_CLASSES');

@Component({
  selector: 'app-explorer',
  imports: [
    NgComponentOutlet, ReactiveFormsModule,
    MatTableModule, MatSortModule, MatPaginatorModule,
    MatFormField, MatInput,
    ColumnsPipe, ColumnPipe
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
  protected readonly _pages = signal([15, 50, 100]);
  protected readonly _data = new SyncDataSource<Production>();
  protected readonly _craftables = assemblyTable;

  constructor() {
    this._data.traverser = () => assemblyTable.columns.map(column => column.id.split('.'));
    this._data.accessor = getAccessor(this._data.accessor, this.#fields);
    this.#subscriptions.push(this._search.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(200),
      tap(value => this._data.query = value)
    ).subscribe());
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
