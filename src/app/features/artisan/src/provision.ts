import { computed, signal } from '@angular/core';

import { greater, product } from '@app/core';
import { Ingredient } from './ingredient';
import { Category } from './category';
import { Purchase } from './purchase';

export class Provision {
  readonly selected = signal<string | null>(null);
  readonly automatic = signal(false);

  /**
   * The assembly matching an item or category of items.
   */
  readonly #purchase = computed(() => {
    let entity = this.ingredient.entity;
    if (entity instanceof Category) {
      const entities = entity.entities;
      if (this.automatic()) {
        entity = entities?.reduce((p, c) => greater(p.price(), c.price()) ? p : c) ?? null;
      } else {
        const selected = this.selected();
        entity = entities?.find(item => item.id === selected) ?? null;
      }
    }
    return entity?.request() ?? null;
  });
  get purchase(): Purchase | null {
    return this.#purchase();
  }

  /**
   * The crafting cost.
   */
  readonly #cost = computed(() =>
    product(this.purchase?.entity.price() ?? null, this.ingredient.quantity)
  );
  get cost(): number | null {
    return this.#cost();
  }

  /**
   * The chance to craft additional items.
   */
  readonly #chance = computed(() =>
    this.purchase?.bonus ?? null
  );
  get chance(): number | null {
    return this.#chance();
  }

  // readonly effectiveValue = computed(() => {
  //   const bonus = this.#parent.extraItemChance();
  //   if (bonus) {
  //     const total = product(product(this.entity.requestedVolume(), this.entity.effectiveValue()), this.entity.getRatio(this.#parent));
  //     return ratio(total, (this.#parent.requestedVolume() * this.quantity));
  //   }
  //   return this.entity.effectiveValue();
  // });

  /**
   * Creates a new Provision instance.
   * @param ingredient The ingredient to provision.
   * @throws Will throw an error if the ingredient is invalid.
   */
  constructor(readonly ingredient: Ingredient) {
    if (!ingredient) {
      throw new Error('Invalid ingredient instance.');
    }
  }
}
