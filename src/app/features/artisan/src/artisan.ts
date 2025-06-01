import { inject, Injectable } from '@angular/core';

import { ObjectMap } from '@app/core';
import { CraftingIngredientType, CraftingTradeskill } from '@app/nw-data';
import { NwBuddy } from '@app/nw-buddy';
import { GamingTools } from '@app/gaming-tools';
import { Craftable } from './craftable';
import { Category } from './category';
import { Equipment } from './equipment';
import { Entity } from './entity';

/**
 * Represents the Artisan module that provides crafting functionality.
 */
@Injectable({
  providedIn: 'root'
})
export class Artisan {
  readonly data = inject(NwBuddy);
  readonly gaming = inject(GamingTools);

  readonly #entities = new ObjectMap<Entity>();
  readonly #categories = new ObjectMap<Category>();
  readonly #equipment: Partial<Record<CraftingTradeskill, Equipment>> = {
    'Smelting': new Equipment(0.05),
    'Jewelcrafting': new Equipment(0.05)
  };

  /**
   * Gets an entity from cache; creates a new one if not found.
   * @param id The ID of an item to retrieve.
   * @returns The item if found or created; otherwise, null.
   */
  getEntity(id: string): Entity | null {
    let entity = this.#entities.get(id) ?? null;
    if (!entity && (this.data.items.has(id) || this.data.housing.has(id))) {
      if (!this.data.items.version()) {
        throw new Error('Items data are not loaded yet.');
      }
      if (!this.data.housing.version()) {
        throw new Error('Housing data are not loaded yet.');
      }
      if (!this.data.recipes.version()) {
        throw new Error('Recipes data are not loaded yet.');
      }

      const item = this.data.items.get(id) ?? this.data.housing.get(id);
      if (!item) {
        throw new Error(`Master item is not found: ${id}`);
      }
      const recipes = this.data.recipes.get(id);
      entity = recipes ? new Craftable(this, item, recipes) : new Entity(this, item);
      entity && this.#entities.set(id, entity);
    }
    return entity;
  }

  /**
   * Gets a craftable entity from cache; creates a new one if not found.
   * @param id The ID of an item to retrieve.
   * @returns The item if found or created; otherwise, null.
   */
  getCraftable(id: string): Craftable | null {
    let entity = this.#entities.get(id) ?? null;
    if (!entity || !(entity instanceof Craftable)) {
      if (!this.data.items.version()) {
        throw new Error('Items data are not loaded yet.');
      }
      if (!this.data.housing.version()) {
        throw new Error('Housing data are not loaded yet.');
      }
      if (!this.data.recipes.version()) {
        throw new Error('Recipes data are not loaded yet.');
      }

      const item = this.data.items.get(id) ?? this.data.housing.get(id);
      if (!item) {
        throw new Error(`Master item is not found: ${id}`);
      }
      const recipes = this.data.recipes.get(id);
      if (!recipes) {
        throw new Error(`Recipes are not found: ${id}`);
      }
      entity = new Craftable(this, item, recipes);
      entity && this.#entities.set(id, entity);
    }
    return entity as Craftable;
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
  getIngredient(id: string, type: CraftingIngredientType): Entity | Category | null {
    switch (type) {
      case 'Item':
        return this.getEntity(id);
      case 'Category_Only':
        return this.getCategory(id);
      default:
        throw new Error(`Ingredient type is not supported: ${type}`);
    }
  }

  /**
   * Gets the equipment context for a specific tradeskill.
   * @param tradeskill The tradeskill to get the equipment context for.
   * @returns The equipment context if found; otherwise, null.
   */
  getContext(tradeskill: CraftingTradeskill): Equipment | null {
    return this.#equipment[tradeskill] ?? null;
  }
}
