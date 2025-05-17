import { computed, signal } from "@angular/core";

import { CraftingIngredientType } from "@app/nw-data";
import { Artisan } from "./artisan";
import { Category } from "./category";

function max(a: number | null, b: number | null): boolean {
  return a != null && b != null ? a > b : a != null ? true : false;
}

export class Ingredient {
  readonly #item = computed(() => this._artisan.getIngredient(this.id, this.type));

  readonly selected = signal<string | null>(null);
  readonly automatic = signal(false);
  readonly item = computed(() => {
    const item = this.#item();
    if (item instanceof Category) {
      const items = item.items();
      if (items) {
        if (this.automatic()) {
          return items.reduce((p, c) => max(p.price(), c.price()) ? p : c);
        } else {
          const selected = this.selected();
          return items.find(item => item.id === selected) ?? null;
        }
      }
      return null;
    }
    return item;
  });

  constructor(private readonly _artisan: Artisan, readonly id: string, readonly type: CraftingIngredientType, readonly quantity: number) {
    if (!_artisan) {
      throw new Error('Invalid artisan instance.');
    }
  }
}
