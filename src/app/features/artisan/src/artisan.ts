import { computed, inject, Injectable } from '@angular/core';

import { TableDefinition } from '@app/core';
import { CraftingRecipeData, HouseItems, MasterItemDefinitions } from '@app/nw-data';
import { NwBuddy, NwI18n, NwIcon } from '@app/nw-buddy';
import { GamingTools } from '@app/gaming-tools';
import { Craftable, getIconInputs } from './craftable';

@Injectable({
  providedIn: 'root'
})
export class Artisan {
  readonly #i18n = inject(NwI18n);
  readonly #data = inject(NwBuddy);
  readonly #gaming = inject(GamingTools);

  readonly craftables: TableDefinition<Craftable> = {
    name: 'recipes',
    columns: [
      { id: 'icon', displayName: 'Icon', width: '0', value: { component: NwIcon, inputs: getIconInputs } },
      { id: 'name', displayName: 'Name', width: '98%', value: { get: item => item.name() } },
      { id: 'price', displayName: 'Price', width: '0%', value: { get: item => item.price() } },
      { id: 'recipes', displayName: 'Recipes', width: '2%', value: { get: item => item.recipes().toString() } }
    ],
    data: computed(() => {
      const objects: Craftable[] = [];
      for (const key of this.#data.recipes.keys() ?? []) {
        objects.push(new Craftable(this, key));
      }
      return objects;
    })
  };

  /**
   * Translates a given key using the localization data.
   * @param key The key to translate.
   * @returns The translated string.
   */
  translate(key: string): string {
    return this.#i18n.get(key);
  }

  /**
   * Gets an item or a housing item from database.
   * @param id The ID of an item to retrieve.
   * @returns The item or housing item if found; otherwise, null.
   */
  getItem(id: string): MasterItemDefinitions | HouseItems | null {
    return this.#data.items.get(id) ?? this.#data.housing.get(id);
  }

  /**
   * Gets a list of recipes that craft a specific item.
   * @param id The ID of the recipes to retrieve.
   * @returns An array of crafting recipes.
   */
  getRecipes(id: string): CraftingRecipeData[] {
    return this.#data.recipes.get(id) ?? [];
  }

  /**
   * Gets the price of a specific item from the Gaming Tools.
   * @param id The ID of an item to retrieve the price for.
   * @returns The price of the item if found; otherwise, null.
   */
  getPrice(id: string): number | null {
    const commodities = this.#gaming.commodities();
    return commodities[id] ?? null;
  }
}
