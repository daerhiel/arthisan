import { computed } from '@angular/core';

import { ratio, subtract, sum } from '@app/core';
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
   * The cumulative chance to craft additional items for the current projection.
   */
  get chance(): number | null { return this.#chance(); }
  readonly #chance = computed(() => {
    const type = this.blueprint.entity.type;
    if (!type || !unsupported.includes(type)) {
      const chance = this.provisions.reduce((s, x) => sum(s, x.bonus), this.blueprint.chance);
      return Math.max(chance, 0);
    }
    return null;
  });

  /**
   * The crafting cost of the projection unit, calculated from the provisions.
   */
  get cost(): number | null { return this.#cost(); }
  readonly #cost = computed(() =>
    this.provisions.reduce<number | null>((s, x) => sum(s, x.total), null)
  );

  /**
   * The effective value of the craft of a unit based on prices and extra items bonuses.
   */
  get value(): number | null { return this.#value(); }
  readonly #value = computed(() => this.cost);

  /**
   * The crafting profit of the projection based crafting state and parameters.
   */
  get profit(): number | null { return this.#profit(); }
  readonly #profit = computed(() => {
    const cost = this.#cost();
    const price = this.blueprint.entity.price;
    return this.assembly.crafted() ? subtract(price, cost) : subtract(cost, price);
  });

  /**
   * The effective volume of materials required for the projection based on the craft parameters.
   */
  get effective(): number | null { return this.#effective(); }
  readonly #effective = computed(() => {
    const bonus = this.chance;
    const requested = this.assembly.requested();
    if (this.assembly.boosted() && bonus && requested) {
      return Math.max(Math.floor(requested / (1 + bonus)), 1);
    }
    return requested;
  });

  get yield(): number | null { return this.#yield(); }
  readonly #yield = computed(() =>
    ratio(this.effective, this.assembly.requested())
  );

  /**
   * The actual volume of materials required for the projection based on the craft parameters.
   */
  get volume(): number | null { return this.#volume(); }
  readonly #volume = computed(() =>
    this.assembly.boosted() ?
      this.#effective() ?? this.assembly.requested() :
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
