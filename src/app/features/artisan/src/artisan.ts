import { inject, Injectable } from '@angular/core';

import { ObjectMap } from '@app/core';
import {
  CraftingRecipeData,
  CraftingCategory, CraftingIngredientType, CraftingTradeskill
} from '@app/nw-data';
import { NwBuddy } from '@app/nw-buddy';
import { GamingTools } from '@app/gaming-tools';
import { Craftable } from './craftable';
import { Category } from './category';
import { Equipment } from './equipment';
import { Entity } from './entity';

/**
 * Excludes specific crafting categories from the list of supported recipes.
 */
const EXCLUDE_CATEGORIES: CraftingCategory[] = ['MaterialConversion'];

/**
 * Filters out unsupported crafting recipes.
 * @param recipes A list of crafting recipes to filter.
 * @returns A filtered list of crafting recipes that excludes material conversion recipes.
 */
function supported(recipes: CraftingRecipeData[] | null): CraftingRecipeData[] | null {
  if (recipes) {
    recipes = recipes.filter(recipe =>
      !EXCLUDE_CATEGORIES.includes(recipe.CraftingCategory)
    );
  }
  return recipes?.length ? recipes : null;
}

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
   * @param id The ID of an entity to retrieve.
   * @returns The entity if found or created; otherwise, null.
   */
  getEntity(id: string): Entity {
    let entity = this.#entities.get(id) ?? null;
    if (!entity) {
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
        throw new Error(`Master item is not found: ${id}.`);
      }
      const recipes = supported(this.data.recipes.get(id));
      entity = recipes ? new Craftable(this, item, recipes) : new Entity(this, item);
      this.#entities.set(id, entity);
      entity.initialize();
    }
    return entity;
  }

  /**
   * Gets a craftable entity from cache; creates a new one if not found.
   * @param id The ID of a craftable entity to retrieve.
   * @returns The craftable entity if found or created; otherwise, null.
   */
  getCraftable(id: string): Craftable {
    let entity = this.#entities.get(id) ?? null;
    if (!entity) {
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
        throw new Error(`Master item is not found: ${id}.`);
      }
      const recipes = supported(this.data.recipes.get(id));
      if (!recipes) {
        throw new Error(`Recipes are not found: ${id}.`);
      }
      entity = new Craftable(this, item, recipes);
      this.#entities.set(id, entity);
      entity.initialize();
    }
    return entity as Craftable;
  }

  /**
   * Gets a category from cache; creates a new one if not found.
   * @param id The ID of a category to retrieve.
   * @returns The category if found or created; otherwise, null.
   */
  getCategory(id: string): Category {
    let category = this.#categories.get(id) ?? null;
    if (!category) {
      if (!this.data.categories.version()) {
        throw new Error('Categories data are not loaded yet.');
      }
      if (!this.data.ingredients.version()) {
        throw new Error('Ingredients data are not loaded yet.');
      }

      const data = this.data.categories.get(id);
      if (!data) {
        throw new Error(`Crafting category is not found: ${id}.`);
      }
      const items = this.data.ingredients.get(id);
      if (!items) {
        throw new Error(`Category items are not found: ${id}.`);
      }

      category = new Category(this, data, items);
      this.#categories.set(id, category);
    }
    return category;
  }

  /**
   * Gets a list of recipes that craft a specific item.
   * @param id The ID of an ingredient to retrieve.
   * @param type The type of an ingredient to get.
   * @returns The ingredient if found; otherwise, null.
   */
  getIngredient(id: string, type: CraftingIngredientType): Entity | Category {
    switch (type) {
      case 'Item':
        return this.getEntity(id);
      case 'Currency':
        switch (id) {
          case 'Azoth_Currency':
            return this.getEntity('AzureT1');
          default:
            console.warn(`Currency: ${id}.`)
            return this.getEntity('AzureT1');
        }
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
