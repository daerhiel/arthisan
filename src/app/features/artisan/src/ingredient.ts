import { Materials } from './contracts';
import { Entity } from './entity';
import { Category } from './category';
import { Provision } from './provision';

/**
 * Represents an ingredient used in crafting recipes.
 */
export class Ingredient implements Materials<Provision> {
  /**
   * Creates a new Ingredient instance.
   * @param artisan The artisan instance to use for crafting.
   * @param entity The entity or category referred by the current ingredient.
   * @param quantity The quantity of the ingredient required.
   * @throws Will throw an error if the artisan is invalid.
   */
  constructor(readonly entity: Entity | Category, readonly quantity: number) {
    if (!entity) {
      throw new Error('Invalid entity or category instance.');
    }
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than zero.');
    }
  }

  /** @inheritdoc */
  request(): Provision {
    return new Provision(this);
  }
}
