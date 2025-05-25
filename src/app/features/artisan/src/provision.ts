import { computed, signal } from '@angular/core';

import { greater, product } from '@app/core';
import { Ingredient } from './ingredient';
import { Category } from './category';
import { Assembly } from './assembly';

export class Provision {
  readonly selected = signal<string | null>(null);
  readonly automatic = signal(false);

  readonly #assembly = computed(() => {
    let item = this.ingredient.source();
    if (item instanceof Category) {
      const items = item.items();
      if (this.automatic()) {
        item = items?.reduce((p, c) => greater(p.price(), c.price()) ? p : c) ?? null;
      } else {
        const selected = this.selected();
        item = items?.find(item => item.id === selected) ?? null;
      }
    }
    return item ? new Assembly(item) : null;
  });
  get assembly(): Assembly | null {
    return this.#assembly();
  }

  readonly #cost = computed(() =>
    product(this.assembly?.craftable.price() ?? null, this.ingredient.quantity)
  );
  get cost(): number | null {
    return this.#cost();
  }

  readonly #chance = computed(() =>
    this.assembly?.projection?.blueprint.bonus ?? null
  );
  get chance(): number | null {
    return this.#chance();
  }

  constructor(readonly ingredient: Ingredient) {
    if (!ingredient) {
      throw new Error('Invalid ingredient instance.');
    }
  }
}
