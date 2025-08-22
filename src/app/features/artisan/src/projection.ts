import { computed } from '@angular/core';

import { subtract, sum } from '@app/core';
import { ItemType } from '@app/nw-data';
import { Materials } from './materials';
import { Assembly } from './assembly';
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
    const type = this.blueprint.entity.type;
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
    this.provisions.reduce<number | null>((s, x) => sum(s, x.cost), null)
  );
  get cost(): number | null { return this.#cost(); }

  /**
   * The effective value of the craft of a unit based on prices and extra items bonuses.
   */
  readonly #value = computed(() => this.cost);
  get value(): number | null { return this.#value(); }

  /**
   * The projected profit relative to market prices.
   */
  readonly #profit = computed(() => subtract(this.blueprint.entity.price, this.cost));
  get profit(): number | null { return this.#profit(); }

  readonly effective = computed(() => {
    const bonus = this.chance;
    const volume = this.assembly.requested();
    if (this.assembly.boosted() && bonus && volume) {
      const effect = Math.max(Math.floor(volume / (1 + bonus)), 1);
      if (effect !== volume) {
        return effect;
      }
    }
    return null;
  });

  /**
   * The actual volume of materials required for the projection based on the craft parameters.
   */
  readonly volume = computed(() =>
    this.assembly.boosted() ?
      this.effective() ?? this.assembly.requested() :
      this.assembly.requested()
  );

  /**
   * Creates a new Projection instance.
   * @param blueprint The blueprint to project.
   * @param materials The materials required for this craft.
   * @throws Will throw an error if the blueprint is invalid.
   * @throws Will throw an error if the materials are invalid.
   */
  constructor(readonly assembly: Assembly, readonly blueprint: Blueprint, readonly materials: Materials) {
    if (!assembly) {
      throw new Error('Invalid assembly instance.');
    }
    if (!blueprint) {
      throw new Error('Invalid blueprint instance.');
    }
    if (!materials) {
      throw new Error('Invalid materials instance.');
    }

    this.provisions = blueprint.ingredients.map(ingredient => ingredient.request(this, materials));
  }
}
