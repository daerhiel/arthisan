import { computed } from '@angular/core';

import { product, ratio, subtract, sum } from '@app/core';
import { Blueprint } from './blueprint';
import { Category } from './category';
import { Materials } from './materials';
import { Assembly } from './assembly';
import { Provision } from './provision';

type IngredientChanceFn = (ingredient: Provision) => number;

function getIngredientChance(tier: number, increments: number[], decrements: number[]): IngredientChanceFn {
  return provision => {
    const diff = provision.purchase.entity.tier - tier;
    if (diff < 0) {
      return decrements[Math.abs(diff) - 1] ?? 0;
    }
    if (diff > 0) {
      return increments[diff - 1] ?? 0;
    }
    return 0;
  }
}

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
  get yieldBonusChance(): number | null {
    return this.#yieldBonusChance();
  }
  readonly #yieldBonusChance = computed(() => {
    let value = this.blueprint.yieldBonusChance;
    if (value == null) {
      return null;
    }

    const { tier, increments, decrements } = this.blueprint;
    if (!increments.length && !decrements.length && this.provisions.length > 1) { // HACK: Charcoal recipes
      value += this.provisions
        .filter(x => x.ingredient.entity instanceof Category)
        .map(getIngredientChance(tier, increments, decrements))
        .reduce((a, b) => a + b, 0);
    }

    return Math.max(0, value);
  });

  /**
   * The crafting cost of the projection unit, calculated from the provisions.
   */
  get cost(): number | null {
    return this.#cost();
  }
  readonly #cost = computed(() =>
    this.provisions.reduce<number | null>((s, x) => sum(s, x.total), null)
  );

  /**
   * The unit differential between the crafting cost and the market price.
   */
  get spread(): number | null {
    return this.#spread();
  }
  readonly #spread = computed(() => {
    const cost = this.#cost();
    const price = this.blueprint.entity.price;
    return cost && price && subtract(price, cost);
  });

  /**
   * The margin percentage between the crafting cost and the market price.
   */
  get margin(): number | null {
    return this.#margin();
  }
  readonly #margin = computed(() =>
    ratio(this.#spread(), this.blueprint.entity.price)
  );

  /**
   * The crafting profit of the projection based crafting state and parameters.
   */
  get profit(): number | null {
    return this.#profit();
  }
  readonly #profit = computed(() => {
    const spread = this.#spread();
    const sign = this.assembly.crafted() ? 1 : -1;
    return product(product(spread, sign), this.assembly.requested());
  });

  /**
   * The effective volume of materials required for the projection based on the craft parameters.
   */
  get effective(): number | null {
    return this.#effective();
  }
  readonly #effective = computed(() => {
    const chance = this.yieldBonusChance;
    const requested = this.assembly.requested();
    if (this.assembly.boosted() && chance && requested) {
      return Math.max(Math.floor(requested / (1 + chance)), 1);
    }
    return requested;
  });

  /**
   * The yield ratio of the projection based on the effective and requested volumes.
   */
  get yieldFactor(): number | null {
    return this.#yield();
  }
  readonly #yield = computed(() =>
    ratio(this.effective, this.assembly.requested())
  );

  /**
   * The actual volume of materials required for the projection based on the craft parameters.
   */
  get volume(): number | null {
    return this.#volume();
  }
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
