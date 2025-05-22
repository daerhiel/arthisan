import { computed, signal } from "@angular/core";

import { Ingredient } from "./ingredient";
import { Category } from "./category";

function max(a: number | null, b: number | null): boolean {
  return a != null && b != null ? a > b : a != null ? true : false;
}

export class Provision {
  readonly selected = signal<string | null>(null);
  readonly automatic = signal(false);

  readonly item = computed(() => {
    const item = this.ingredient.source();
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

  constructor(readonly ingredient: Ingredient) {
    if (!ingredient) {
      throw new Error('Invalid ingredient instance.');
    }
  }
}
