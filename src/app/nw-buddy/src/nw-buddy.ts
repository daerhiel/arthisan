import { inject, Injectable, OnDestroy } from '@angular/core';

import { DATASHEETS } from '@app/nw-data';
import { NwBuddyApi } from './nw-buddy-api';
import { ObjectCache, CollectionCache } from './object-cache';


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
   * The house item definitions data.
   */
  readonly housing = new ObjectCache(
    this.#api.getDataSheets(DATASHEETS.HouseItems),
    item => item.HouseItemID
  );

  /**
   * The crafting category data.
   */
  readonly categories = new ObjectCache(
    this.#api.getDataSheets(DATASHEETS.CraftingCategoryData),
    item => item.CategoryID
  );

  /**
   * The crafting recipe data.
   */
  readonly recipes = new CollectionCache(
    this.#api.getDataSheets(DATASHEETS.CraftingRecipeData),
    item => item.ItemID
  );

  /** @inheritdoc */
  ngOnDestroy(): void {
    this.items.destroy();
    this.recipes.destroy();
  }
}
