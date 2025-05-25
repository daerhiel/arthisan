import { CraftingIngredientType, CraftingRecipeData } from '@app/nw-data';

import { Artisan } from './artisan';
import { Craftable } from './craftable';
import { Ingredient } from './ingredient';

export class Blueprint {
  readonly ingredients: Ingredient[] = [];

  constructor(private readonly _artisan: Artisan, readonly item: Craftable, recipe: CraftingRecipeData) {
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
}
