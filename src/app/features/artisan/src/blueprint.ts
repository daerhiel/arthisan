import { sum } from '@app/core';
import { CraftingIngredientType, CraftingRecipeData } from '@app/nw-data';
import { Artisan } from './artisan';
import { Deferrable, Providable } from './contracts';
import { Materials } from './materials';
import { Craftable } from './craftable';
import { CraftingIngredientData, Ingredient } from './ingredient';
import { Equipment } from './equipment';
import { Projection } from './projection';

/**
 * Extracts ingredients from a crafting recipe.
 * @param recipe The crafting recipe data to extract ingredients from.
 * @returns An array of crafting ingredient data.
 */
export function getIngredients(recipe: CraftingRecipeData): CraftingIngredientData[] {
  return Object.keys(recipe || {})
    .filter(key => key.match(/^Ingredient\d+$/))
    .map(key => {
      const match = /^Ingredient(\d+)$/.exec(key);
      if (match) {
        const index = parseInt(match[1], 10);
        const id = recipe[`Ingredient${index}` as keyof CraftingRecipeData] as string;
        const type = recipe[`Type${index}` as keyof CraftingRecipeData] as CraftingIngredientType;
        const quantity = recipe[`Qty${index}` as keyof CraftingRecipeData] as number;
        if (id && quantity) {
          return { id, type: type ?? 'Item', quantity };
        }
      }
      return null;
    })
    .filter(x => !!x);
}

/**
 * Represents a crafting blueprint that contains the necessary ingredients and recipe data for crafting.
 */
export class Blueprint implements Deferrable, Providable<Projection> {
  readonly ingredients: Ingredient[] = [];

  /**
   * Gets the bonus items chance for the current craftable.
   */
  get bonus(): number { return this.recipe.BonusItemChance; }

  /**
   * Gets the crafting equipment context for the current blueprint.
   */
  get chance(): number {
    return sum(this.bonus, this.getContext()?.chance ?? null);
  }

  /**
   * Creates a new Blueprint instance.
   * @param artisan The artisan instance to use for crafting.
   * @param entity The craftable entity associated with this blueprint.
   * @param recipe The crafting recipe data for this blueprint.
   * @throws Will throw an error if the artisan or entity is invalid.
   * @throws Will throw an error if the recipe is invalid or missing required ingredients.
   */
  constructor(private readonly artisan: Artisan, readonly entity: Craftable, private readonly recipe: CraftingRecipeData) {
    if (!artisan) {
      throw new Error('Invalid artisan instance.');
    }
    if (!entity) {
      throw new Error('Invalid entity data.');
    }

    for (const ingredient of getIngredients(recipe)) {
      this.ingredients.push(new Ingredient(artisan, ingredient));
    }
  }

  /** @inheritdoc */
  initialize(): void {
    for (const ingredient of this.ingredients) {
      ingredient.initialize();
    }
  }

  /**
   * Gets the crafting equipment context for the current blueprint.
   * @returns The equipment context if available; otherwise, null.
   */
  getContext(): Equipment | null {
    return this.artisan.getContext(this.recipe?.Tradeskill);
  }

  /** @inheritdoc */
  request(materials: Materials): Projection {
    return new Projection(this, materials);
  }
}
