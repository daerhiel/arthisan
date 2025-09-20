import { sum } from '@app/core';
import { CraftingIngredientType, CraftingRecipeData } from '@app/nw-data';
import { Artisan } from './artisan';
import { Containable, Deferrable } from './contracts';
import { Craftable } from './craftable';
import { CraftingIngredientData, CraftingIngredientDataFn, Ingredient } from './ingredient';
import { Equipment } from './equipment';
import { Materials } from './materials';
import { Assembly } from './assembly';
import { Projection } from './projection';

/**
 * Regular expression pattern to match ingredient keys in the recipe.
 */
const pattern = /^Ingredient(\d+)$/;

/**
 * Extracts a crafting ingredient data function from a crafting recipe.
 * @param recipe The crafting recipe data to extract the ingredient from.
 * @returns A function that extracts crafting ingredient data based on the provided key.
 */
export function getIngredient(recipe: CraftingRecipeData): CraftingIngredientDataFn {
  return key => {
    const match = pattern.exec(key);
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
  }
}

/**
 * Extracts ingredients from a crafting recipe.
 * @param recipe The crafting recipe data to extract ingredients from.
 * @returns An array of crafting ingredient data.
 */
export function getIngredients(recipe: CraftingRecipeData): CraftingIngredientData[] {
  return Object.keys(recipe || {})
    .filter(key => key.match(pattern))
    .map(getIngredient(recipe))
    .filter(x => !!x);
}

/**
 * Represents a crafting blueprint that contains the necessary ingredients and recipe data for crafting.
 */
export class Blueprint implements Deferrable, Containable<Assembly, Projection> {
  readonly ingredients: Ingredient[] = [];

  /**
   * Gets the tier of the blueprint.
   */
  get tier() {
    const id = this.entity.id;
    switch (!!id) {
      case /^BlockT5$/i.test(id): // HACK: Align with in-game
        return 4;
      case /^AlkahestT\d$/.test(id): // HACK: Alkahest has no base tier
        return 0;
      default:
        return this.recipe.BaseTier ?? this.entity.tier;
    }
  }

  /**
   * Gets the bonus items chance for the current craftable.
   */
  get bonus(): number { return this.recipe.BonusItemChance; }

  /**
   * Gets the bonus item chance increment matrix per ingredient tier difference.
   */
  get increments(): number[] {
    return String(this.recipe.BonusItemChanceIncrease || '').split(',').map(Number);
  }

  /**
   * Gets the bonus item chance decrement matrix per ingredient tier difference.
   */
  get decrements(): number[] {
    return String(this.recipe.BonusItemChanceDecrease || '').split(',').map(Number);
  }

  /**
   * The cumulative chance to craft additional items including the crafting equipment.
   */
  get chance(): number {
    return sum(this.recipe.BonusItemChance, this.getContext()?.chance ?? null);
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
      throw new Error('Invalid Artisan instance.');
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

    this.ingredients.sort((a, b) => {
      const ta = a.entity instanceof Craftable;
      const tb = b.entity instanceof Craftable;
      return Number(tb) - Number(ta);
    });
  }

  /**
   * Gets the crafting equipment context for the current blueprint.
   * @returns The equipment context if available; otherwise, null.
   */
  getContext(): Equipment | null {
    return this.artisan.getContext(this.recipe?.Tradeskill);
  }

  /** @inheritdoc */
  request(parent: Assembly, materials: Materials): Projection {
    return new Projection(parent, this, materials);
  }
}
