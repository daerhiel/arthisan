import { sum } from '@app/core';
import { CraftingIngredientType, CraftingRecipeData } from '@app/nw-data';
import { Artisan } from './artisan';
import { Craftable } from './craftable';
import { Ingredient } from './ingredient';
import { Equipment } from './equipment';

/**
 * Represents a crafting blueprint that contains the necessary ingredients and recipe data for crafting an item.
 */
export class Blueprint {
  readonly ingredients: Ingredient[] = [];

  /**
   * Gets the bonus items chance for the current item.
   */
  get bonus(): number {
    return this.recipe.BonusItemChance;
  }

  /**
   * Gets the crafting equipment context for the current blueprint.
   */
  get chance(): number {
    return sum(this.bonus, this.getContext()?.chance ?? null);
  }

  /**
   * Creates a new Blueprint instance.
   * @param artisan The artisan instance to use for crafting.
   * @param item The craftable item associated with this blueprint.
   * @param recipe The crafting recipe data for this blueprint.
   * @throws Will throw an error if the artisan or item is invalid.
   * @throws Will throw an error if the recipe is invalid or missing required ingredients.
   */
  constructor(private readonly _artisan: Artisan, readonly item: Craftable, private readonly recipe: CraftingRecipeData) {
    if (!_artisan) {
      throw new Error('Invalid artisan instance.');
    }
    if (!item) {
      throw new Error('Invalid item data.');
    }

    const items: { id: string, type: CraftingIngredientType, qty: number }[] = [];
    if (recipe?.Ingredient1) {
      items.push({ id: recipe.Ingredient1, type: recipe.Type1, qty: recipe.Qty1 });
    }
    if (recipe?.Ingredient2) {
      items.push({ id: recipe.Ingredient2, type: recipe.Type2, qty: recipe.Qty2 });
    }
    if (recipe?.Ingredient3) {
      items.push({ id: recipe.Ingredient3, type: recipe.Type3, qty: recipe.Qty3 });
    }
    if (recipe?.Ingredient4) {
      items.push({ id: recipe.Ingredient4, type: recipe.Type4, qty: recipe.Qty4 });
    }
    if (recipe?.Ingredient5) {
      items.push({ id: recipe.Ingredient5, type: recipe.Type5, qty: recipe.Qty5 });
    }
    if (recipe?.Ingredient6) {
      items.push({ id: recipe.Ingredient6, type: recipe.Type6, qty: recipe.Qty6 });
    }
    if (recipe?.Ingredient7) {
      items.push({ id: recipe.Ingredient7, type: recipe.Type7, qty: recipe.Qty7 });
    }
    for (const item of items) {
      this.ingredients.push(new Ingredient(this._artisan, item.id, item.type, item.qty));
    }
  }

  /**
   * Gets the crafting equipment context for the current blueprint.
   * @returns The equipment context if available; otherwise, null.
   */
  getContext(): Equipment | null {
    return this._artisan.getContext(this.recipe?.Tradeskill);
  }
}
