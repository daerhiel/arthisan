import { ChangeDetectionStrategy, Component, computed, effect, inject, InjectionToken, OnDestroy, ViewChild } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { getStorageItem, TableDefinition } from '@app/core';
import { CraftingCategory, CraftingRecipeData, ItemClass, MasterItemDefinitions } from '@app/nw-data';
import { NwI18n } from '@app/nw-buddy';
import { Artisan, ColumnPipe, ColumnsPipe, MATERIALS_STORAGE_KEY, MaterialsState, Production, supported } from '@features/artisan';
import { assemblyTable } from './assembly';

export const EXPLORE_ITEM_CATEGORIES = new InjectionToken<CraftingCategory[]>('EXPLORE_ITEM_CATEGORIES');
export const EXPLORE_ITEM_CLASSES = new InjectionToken<ItemClass[]>('EXPLORE_ITEM_CLASSES');

@Component({
  selector: 'app-explorer',
  imports: [
    NgComponentOutlet,
    MatTableModule, MatSortModule,
    ColumnsPipe, ColumnPipe
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

  readonly data = new MatTableDataSource<Production>();
  readonly craftables: TableDefinition<Production> = assemblyTable;

  readonly #recover = effect(() => {
    const materials = getStorageItem<Record<string, MaterialsState>>(MATERIALS_STORAGE_KEY, {});
    const objects = this.#data();
    for (const object of objects) {
      const state = materials[object.entity.id];
      state && object.materials.setState(state);
    }
  });
  readonly #refresh = effect(() => {
    this.data.data = this.#data();
  });

  @ViewChild(MatSort)
  set sort(sort: MatSort) {
    this.data.sort = sort;
  }

  /** @inheritdoc */
  ngOnDestroy(): void {
    this.#recover.destroy();
    this.#refresh.destroy();
  }

  private _isExcluded(recipes: CraftingRecipeData[]): boolean {
    return recipes.every(x => this.#categories.includes(x.CraftingCategory));
  }

  private _isIncluded(item: MasterItemDefinitions): boolean {
    return this.#classes.every(name => item.ItemClass.includes(name));
  }
}
