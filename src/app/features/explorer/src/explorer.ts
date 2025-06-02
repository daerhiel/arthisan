import { Component, computed, effect, inject, InjectionToken, ViewChild } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { TableDefinition } from '@app/core';
import { ItemClass } from '@app/nw-data';
import { NwI18n } from '@app/nw-buddy';
import { Artisan, Assembly, assemblyTable, ColumnPipe, ColumnsPipe } from '@features/artisan';

export const EXPLORE_ITEM_CLASSES = new InjectionToken<ItemClass[]>('EXPLORE_ITEM_CLASSES');

@Component({
  imports: [
    NgComponentOutlet,
    MatTableModule, MatSortModule,
    ColumnsPipe, ColumnPipe
  ],
  templateUrl: './explorer.html',
  styleUrl: './explorer.scss'
})
export class ExplorerComponent {
  readonly #artisan = inject(Artisan);
  readonly #classes = inject(EXPLORE_ITEM_CLASSES, { optional: true }) ?? [];
  protected readonly _i18n = inject(NwI18n);

  readonly #data = computed(() => {
    const objects: Assembly[] = [];
    for (const key of this.#artisan.data.recipes.keys() ?? []) {
      const item = this.#artisan.data.items.get(key);
      if (item && this.#classes.every(name => item.ItemClass.includes(name))) {
        const craftable = this.#artisan.getCraftable(key);
        craftable && objects.push(craftable.request());
      }
    }
    return objects;
  });

  readonly data = new MatTableDataSource<Assembly>();
  readonly craftables: TableDefinition<Assembly> = assemblyTable;

  protected _refresh = effect(() => {
    this.data.data = this.#data();
  });

  @ViewChild(MatSort)
  set sort(sort: MatSort) {
    this.data.sort = sort;
  }
}
