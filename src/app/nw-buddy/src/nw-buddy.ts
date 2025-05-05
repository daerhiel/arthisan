import { inject, Injectable, OnDestroy } from '@angular/core';

import { DATASHEETS } from '@app/nw-data';
import { NwBuddyApi } from './nw-buddy-api';
import { NwI18n } from './nw-i18n';
import { ObjectCache, CollectionCache } from './object-cache';


/**
 * Represents the NW Buddy module that provides New World database functionality.
 */
@Injectable({
  providedIn: 'root'
})
export class NwBuddy implements OnDestroy {
  readonly #api = inject(NwBuddyApi)
  readonly #i18n = inject(NwI18n);

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

  /**
   * Translates a given key using the localization data.
   * @param key The key to translate.
   * @returns The translated string.
   */
  translate(key: string): string {
    return this.#i18n.get(key);
  }
}
