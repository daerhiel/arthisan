import { computed } from '@angular/core';

import { subtract, sum } from '@app/core';
import { ItemType } from '@app/nw-data';
import { Blueprint } from './blueprint';
import { Provision } from './provision';

const unsupported: ItemType[] = ['Weapon', 'Armor', 'HousingItem'];

/**
 * Represents a projection of a crafting blueprint.
 * Projections estimate crafting cost based on the preferences and equipment of an artisan.
 */
export class Projection {
  readonly provisions: Provision[];

  /**
   * The total cost of the projection, calculated from the provisions.
   */
  readonly #cost = computed(() =>
    this.provisions.reduce((s: number | null, x) => sum(s, x.cost), null)
  );
  get cost(): number | null {
    return this.#cost();
  }

  /**
   * The projected profit relative to market prices.
   */
  readonly #profit = computed(() =>
    subtract(this.blueprint.item.price(), this.cost)
  );
  get profit(): number | null {
    return this.#profit();
  }

  /**
   * The chance to craft additional items.
   */
  readonly #chance = computed(() => {
    const type = this.blueprint.item.type();
    if (!type || !unsupported.includes(type)) {
      const chance = this.provisions.reduce((s, x) => sum(s, x.chance), this.blueprint.chance);
      return Math.max(chance, 0);
    }
    return null;
  });
  get chance(): number | null {
    return this.#chance();
  }

  /**
   * Creates a new Projection instance.
   * @param blueprint The blueprint to project.
   * @throws Will throw an error if the blueprint is invalid.
   */
  constructor(readonly blueprint: Blueprint) {
    if (!blueprint) {
      throw new Error('Invalid blueprint instance.');
    }
    this.provisions = blueprint.ingredients.map(ingredient => new Provision(ingredient));
  }
}
