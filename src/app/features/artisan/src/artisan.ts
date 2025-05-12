import { computed, inject, Injectable } from '@angular/core';

import { TableDefinition } from '@app/core';
import { CraftingRecipeData, HouseItems, MasterItemDefinitions } from '@app/nw-data';
import { NwBuddy, NwI18n, NwIcon, NwPrice } from '@app/nw-buddy';
import { GamingTools } from '@app/gaming-tools';
import { Craftable, getIconInputs, getPriceInputs } from './craftable';

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
      for (const key of this.#data.recipes.keys() ?? []) {
        const item = this.#data.items.get(key);
        if (item && item.ItemClass.includes('Resource') && item.ItemClass.includes('Gem')) {
          objects.push(new Craftable(this, key));
        }
      }
      return objects;
    })
  };

  /**
   * Translates a given key using the localization data.
   * @param key The key to translate.
   * @param prefixes Optional prefixes to prepend to the key.
   * @returns The translated string.
   */
  translate(key: string, ...prefixes: string[]): string {
    return this.#i18n.get(key, ...prefixes);
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
  getRecipes(id: string): CraftingRecipeData[] | null {
    return this.#data.recipes.get(id);
  }

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
