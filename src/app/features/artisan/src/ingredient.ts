import { computed } from '@angular/core';

import { CraftingIngredientType } from '@app/nw-data';
import { Artisan } from './artisan';

export class Ingredient {
  readonly source = computed(() => this._artisan.getIngredient(this.id, this.type));

  constructor(private readonly _artisan: Artisan, readonly id: string, readonly type: CraftingIngredientType, readonly quantity: number) {
    if (!_artisan) {
      throw new Error('Invalid artisan instance.');
    }
  }
}
