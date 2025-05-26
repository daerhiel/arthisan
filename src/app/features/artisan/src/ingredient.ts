import { computed } from '@angular/core';

import { CraftingIngredientType } from '@app/nw-data';
import { Artisan } from './artisan';
import { Craftable } from './craftable';
import { Category } from './category';

/**
 * Represents an ingredient used in crafting recipes.
 */
export class Ingredient {
  /**
   * The entity or category referred by the current ingredient.
   */
  readonly #entity = computed(() =>
    this.artisan.getIngredient(this.id, this.type)
  );
  get entity(): Craftable | Category | null {
    return this.#entity();
  }

  /**
   * Creates a new Ingredient instance.
   * @param artisan The artisan instance to use for crafting.
   * @param id The ID of an ingredient.
   * @param type The type of an ingredient (e.g., Item).
   * @param quantity The quantity of the ingredient required.
   * @throws Will throw an error if the artisan is invalid.
   */
  constructor(private readonly artisan: Artisan, readonly id: string, readonly type: CraftingIngredientType, readonly quantity: number) {
    if (!artisan) {
      throw new Error('Invalid artisan instance.');
    }
  }
}
