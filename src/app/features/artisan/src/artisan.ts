import { inject, Injectable } from '@angular/core';

import { ObjectMap } from '@app/core';
import { CraftingIngredientType } from '@app/nw-data';
import { NwBuddy, NwI18n } from '@app/nw-buddy';
import { GamingTools } from '@app/gaming-tools';
import { Craftable } from './craftable';
import { Category } from './category';

/**
 * Represents the Artisan module that provides crafting functionality.
 */
@Injectable({
  providedIn: 'root'
})
export class Artisan {
  readonly i18n = inject(NwI18n);
  readonly data = inject(NwBuddy);
  readonly gaming = inject(GamingTools);

  readonly #items = new ObjectMap<Craftable>();
  readonly #categories = new ObjectMap<Category>();

  /**
   * Gets a craftable item from cache; creates a new one if not found.
   * @param id The ID of an item to retrieve.
   * @returns The item if found or created; otherwise, null.
   */
  getItem(id: string): Craftable | null {
    let item = this.#items.get(id) ?? null;
    if (!item && (this.data.items.has(id) || this.data.housing.has(id))) {
      item = new Craftable(this, id);
      item && this.#items.set(id, item);
    }
    return item;
  }

  /**
   * Gets a category from cache; creates a new one if not found.
   * @param id The ID of a category to retrieve.
   * @returns The category if found or created; otherwise, null.
   */
  getCategory(id: string): Category | null {
    let category = this.#categories.get(id) ?? null;
    if (!category && this.data.categories.has(id)) {
      category = new Category(this, id);
      category && this.#categories.set(id, category);
    }
    return category;
  }

  /**
   * Gets a list of recipes that craft a specific item.
   * @param id The ID of an ingredient to retrieve.
   * @param type The type of an ingredient to get.
   * @returns The ingredient if found; otherwise, null.
   */
  getIngredient(id: string, type: CraftingIngredientType): Craftable | Category | null {
    switch (type) {
      case 'Item':
        return this.getItem(id);
      case 'Category_Only':
        return this.getCategory(id);
      default:
        throw new Error(`Ingredient type is not supported: ${type}`);
    }
  }
}
