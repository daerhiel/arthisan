import { computed } from '@angular/core';

import { subtract, sum } from '@app/core';
import { ItemType } from '@app/nw-data';
import { Materials } from './materials';
import { OptimizationMode } from './assembly';
import { Blueprint } from './blueprint';
import { Provision } from './provision';

const unsupported: ItemType[] = ['Weapon', 'Armor', 'HousingItem'];

/**
 * Represents a projection of a crafting blueprint, which includes the provisions and their costs.
 * @remarks Projections estimate crafting cost based on the preferences and equipment of an artisan.
 */
export class Projection {
  /**
   * The list of provisioned ingredients in a current projection for a blueprint.
   */
  readonly provisions: Provision[];

  /**
   * The chance to craft additional items.
   */
  readonly #chance = computed(() => {
    const type = this.blueprint.item.type;
    if (!type || !unsupported.includes(type)) {
      const chance = this.provisions.reduce((s, x) => sum(s, x.chance), this.blueprint.chance);
      return Math.max(chance, 0);
    }
    return null;
  });
  get chance(): number | null { return this.#chance(); }

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
   * The effective value of the craft of a unit based on prices and extra items bonuses.
   */
  readonly #value = computed(() =>
    this.cost
  );
  get value(): number | null {
    return this.#value();
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
   * Creates a new Projection instance.
   * @param blueprint The blueprint to project.
   * @param materials The materials required for this craft.
   * @throws Will throw an error if the blueprint is invalid.
   * @throws Will throw an error if the materials are invalid.
   */
  constructor(readonly blueprint: Blueprint, readonly materials: Materials) {
    if (!blueprint) {
      throw new Error('Invalid blueprint instance.');
    }
    if (!materials) {
      throw new Error('Invalid materials instance.');
    }
    this.provisions = blueprint.ingredients.map(ingredient => ingredient.request(materials));
  }

  /**
   * Optimizes the assembly based on the specified optimization criteria.
   * @param mode The optimization mode to apply.
   */
  optimize(mode: OptimizationMode) {
    for (const provision of this.provisions) {
      provision.optimize(mode);
    }
  }
}
