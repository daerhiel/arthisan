import { computed, inject, Injectable, OnDestroy } from '@angular/core';

import { DATASHEETS } from '@app/nw-data';
import { TableDefinition } from './models/tables';
import { ObjectCache, CollectionCache } from './object-cache';
import { NwBuddyApi } from './nw-buddy-api';
import { NwIcon } from './nw-icon';
import { Craftable } from './models/craftable';

/**
 * Represents the NW Buddy module that provides New World database functionality.
 */
@Injectable({
  providedIn: 'root'
})
export class NwBuddy implements OnDestroy {
  readonly #api = inject(NwBuddyApi)

  /**
   * The item definitions data.
   */
  readonly items = new ObjectCache(
    this.#api.getDataSheets(DATASHEETS.MasterItemDefinitions),
    item => item.ItemID
  );

  /**
   * The crafting recipe data.
   */
  readonly recipes = new CollectionCache(
    this.#api.getDataSheets(DATASHEETS.CraftingRecipeData),
    item => item.ItemID
  );

  readonly recipeDefs: TableDefinition<Craftable> = {
    name: 'recipes',
    columns: [
      { id: 'icon', displayName: 'Icon', value: { component: NwIcon, inputs: item => ({ path: item.icon(), name: item.name() }) } },
      { id: 'name', displayName: 'Name', value: { get: item => item.name() } }
    ],
    data: computed(() => {
      const objects: Craftable[] = [];
      for (const key of this.recipes.keys() ?? []) {
        objects.push(new Craftable(this, key));
      }
      return objects;
    })
  };

  /** @inheritdoc */
  ngOnDestroy(): void {
    this.items.destroy();
    this.recipes.destroy();
  }
}
