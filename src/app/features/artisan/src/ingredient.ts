import { CraftingIngredientType } from '@app/nw-data';
import { Containable, Deferrable } from './contracts';
import { Artisan } from './artisan';
import { Entity } from './entity';
import { Category } from './category';
import { Materials } from './materials';
import { Projection } from './projection';
import { Provision } from './provision';

/**
 * Represents the crafting ingredient data to cache in ingredient for initialization.
 */
export interface CraftingIngredientData {
  id: string;
  type: CraftingIngredientType;
  quantity: number;
}

/**
 * Function type to extract crafting ingredient data from a recipe.
 */
export type CraftingIngredientDataFn = (key: string) => CraftingIngredientData | null;

/**
 * Represents an ingredient used in crafting recipes.
 */
export class Ingredient implements Deferrable, Containable<Projection, Provision> {
  readonly #source: CraftingIngredientData;
  #entity!: Entity | Category;

  get id() { return this.#source.id; }
  get name() { return this.#entity.name; }
  get quantity() { return this.#source.quantity; }
  get entity() { return this.#entity; }

  /**
   * Creates a new Ingredient instance.
   * @param artisan The artisan instance to use for crafting.
   * @param source The crafting ingredient data to use.
   * @throws Will throw an error if the artisan is invalid.
   * @throws Will throw an error if the source data is invalid or quantity is less than or equal to zero.
   */
  constructor(private readonly artisan: Artisan, readonly source: CraftingIngredientData) {
    if (!artisan) {
      throw new Error('Invalid Artisan instance.');
    }
    if (!source) {
      throw new Error('Invalid ingredient data.');
    }
    if (source.quantity <= 0) {
      throw new Error('Quantity must be greater than zero.');
    }

    this.#source = source;
  }

  /** @inheritdoc */
  initialize(): void {
    this.#entity = this.artisan.getIngredient(this.#source.id, this.#source.type);
  }

  /** @inheritdoc */
  request(parent: Projection, materials: Materials): Provision {
    return new Provision(parent, this, materials);
  }
}
