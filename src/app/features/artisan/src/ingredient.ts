import { computed, signal } from "@angular/core";

import { CraftingIngredientType } from "@app/nw-data";
import { Artisan } from "./artisan";
import { Category } from "./category";

export class Ingredient {
  readonly #item = computed(() => this._artisan.getIngredient(this.id, this.type));

  readonly selected = signal<string | null>(null);
  readonly item = computed(() => {
    const item = this.#item();
    if (item instanceof Category) {
      const id = this.selected();
      return item.items()?.find(item => item.id === id) ?? null;
    }
    return item;
  });

  constructor(private readonly _artisan: Artisan, readonly id: string, readonly type: CraftingIngredientType, readonly quantity: number) {
  }
}
