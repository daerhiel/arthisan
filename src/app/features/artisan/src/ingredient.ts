import { CraftingIngredientType } from "@app/nw-data";
import { Artisan } from "./artisan";
// import { computed } from "@angular/core";

export class Ingredient {
  // readonly #item = computed(() => this._artisan.getIngredient(this.id, this.type));

  constructor(private readonly _artisan: Artisan, readonly id: string, readonly type: CraftingIngredientType, readonly quantity: number) {
    // if (type === 'Category_Only') {
    //   _artisan.
    // }
  }
}
