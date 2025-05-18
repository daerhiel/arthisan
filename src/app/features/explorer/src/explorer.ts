import { Component, computed, effect, inject, InjectionToken, ViewChild } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { TableDefinition } from '@app/core';
import { ItemClass } from '@app/nw-data';
import { NwIcon, NwPrice } from '@app/nw-buddy';
import { Artisan, ColumnPipe, ColumnsPipe, Craftable, getIconInputs, getPriceInputs } from '@features/artisan';

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

  readonly craftables: TableDefinition<Craftable> = {
    name: 'recipes',
    columns: [
      { id: 'icon', displayName: 'Icon', width: '0', value: { component: NwIcon, inputs: getIconInputs } },
      { id: 'name', displayName: 'Name', width: '58%', value: { get: item => item.name() } },
      { id: 'category', displayName: 'Category', width: '7%', value: { get: item => item.category() } },
      { id: 'family', displayName: 'Family', width: '13%', value: { get: item => item.family() } },
      { id: 'type', displayName: 'Type', width: '10%', value: { get: item => item.type() } },
      { id: 'tier', displayName: 'Tier', width: '5%', align: 'right', value: { get: item => item.tier() } },
      { id: 'price', displayName: 'Price', width: '5%', align: 'right', value: { component: NwPrice, inputs: getPriceInputs(x => x.price()) } },
      { id: 'blueprints', displayName: 'Recipes', width: '2%', value: { get: item => item.blueprints()?.length.toString() } }
    ],
    data: computed(() => {
      const objects: Craftable[] = [];
      for (const key of this.#artisan.data.recipes.keys() ?? []) {
        const item = this.#artisan.data.items.get(key);
        if (item && this.#classes.every(name => item.ItemClass.includes(name))) {
          const craftable = this.#artisan.getItem(key);
          craftable && objects.push(craftable);
        }
      }
      return objects;
    })
  };

  readonly data = new MatTableDataSource<Craftable>();
  protected _refresh = effect(() => {
    this.data.data = this.craftables.data();
  });

  @ViewChild(MatSort)
  set sort(sort: MatSort) {
    this.data.sort = sort;
  }
}
