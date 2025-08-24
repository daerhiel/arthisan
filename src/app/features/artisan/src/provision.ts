import { computed, signal } from '@angular/core';

import { greater, product } from '@app/core';
import { Materials } from './materials';
import { Ingredient } from './ingredient';
import { Category } from './category';
import { Assembly } from './assembly';
import { Projection } from './projection';
import { Purchase } from './purchase';

/**
 * Represents a provision for an ingredient, which includes the ingredient and materials required.
 * @remarks Provisions are used to estimate crafting costs and chances based on the artisan's preferences and equipment.
 */
export class Provision {
  readonly selected = signal<string | null>(null);
  readonly automatic = signal(false);

  /**
   * The list of purchases for the provision.
   */
  readonly purchases: Purchase[];

  /**
   * The assembly matching an entity or category of entities.
   */
  get purchase(): Purchase { return this.#purchase(); }
  readonly #purchase = computed(() => {
    if (this.automatic()) {
      return this.purchases.reduce((p, c) => greater(p.price, c.price) ? p : c) ?? null;
    } else {
      const selected = this.selected();
      return this.purchases.find(x => x.entity.id === selected) ?? this.purchases[0]!;
    }
  });

  /**
   * The bonus items chance for the downstream craftable entity.
   */
  get bonus(): number | null { return this.#bonus(); }
  readonly #bonus = computed(() => {
    const purchase = this.#purchase();
    if (purchase instanceof Assembly) {
      return purchase.projection?.blueprint.bonus ?? null;
    }
    return null;
  });

  /**
   * The unit value of the purchase referenced by the current provision.
   */
  get value(): number | null { return this.#value(); }
  readonly #value = computed(() =>
    this.#purchase().value
  );

  /**
   * The total value of materials required for the current provision.
   */
  get total(): number | null { return this.#total(); }
  readonly #total = computed(() =>
    product(this.value, this.ingredient.quantity)
  );

  /**
   * The crafting profit for the downstream craftable entity.
   */
  get profit(): number | null { return this.#profit(); }
  readonly #profit = computed(() => {
    const purchase = this.#purchase();
    if (purchase instanceof Assembly) {
      return purchase.profit;
    }
    return null;
  });

  /**
   * The actual volume of materials required for the provision based on the craft parameters.
   */
  get volume(): number | null { return this.#volume(); }
  readonly #volume = computed(() =>
    product(this.projection.volume, this.ingredient.quantity)
  );

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
   * @param materials The materials required for this craft.
   * @throws Will throw an error if the ingredient is invalid.
   * @throws Will throw an error if the materials are invalid.
   */
  constructor(readonly projection: Projection, readonly ingredient: Ingredient, readonly materials: Materials) {
    if (!projection) {
      throw new Error('Invalid projection instance.');
    }
    if (!ingredient) {
      throw new Error('Invalid ingredient instance.');
    }
    if (!materials) {
      throw new Error('Invalid materials instance.');
    }

    const category = ingredient.entity;
    const entitles = category instanceof Category ? category.entities : [category];
    this.purchases = entitles.map(entity => materials.request(this, entity));
  }
}
