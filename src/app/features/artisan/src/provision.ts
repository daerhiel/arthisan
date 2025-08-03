import { computed, signal } from '@angular/core';

import { greater, product } from '@app/core';
import { Materials } from './materials';
import { Ingredient } from './ingredient';
import { Category } from './category';
import { Purchase } from './purchase';
import { Assembly } from './assembly';

/**
 * Represents a provision for an ingredient, which includes the ingredient and materials required.
 * @remarks Provisions are used to estimate crafting costs and chances based on the artisan's preferences and equipment.
 */
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
        entity = entities.reduce((p, c) => greater(p.price(), c.price()) ? p : c) ?? null;
      } else {
        const selected = this.selected();
        entity = entities.find(item => item.id === selected) ?? entities[0]!;
      }
    }
    return this.materials.request(entity);
  });
  get purchase(): Purchase { return this.#purchase(); }

  /**
   * The purchase cost.
   */
  readonly #cost = computed(() =>
    product(this.purchase.entity.price(), this.ingredient.quantity)
  );
  get cost(): number | null {
    return this.#cost();
  }

  /**
   * The chance to craft additional items.
   */
  readonly #chance = computed(() =>
    this.purchase.bonus
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
   * @param materials The materials required for this craft.
   * @throws Will throw an error if the ingredient is invalid.
   * @throws Will throw an error if the materials are invalid.
   */
  constructor(readonly ingredient: Ingredient, readonly materials: Materials) {
    if (!ingredient) {
      throw new Error('Invalid ingredient instance.');
    }
    if (!materials) {
      throw new Error('Invalid materials instance.');
    }
  }

  // TODO: Remove this function when materialization is automatic
  materialize(): void {
    const entity = this.ingredient.entity;
    const entitles = entity instanceof Category ? entity.entities : [entity];
    entitles.forEach(x => {
      const purchase = this.materials.request(x)
      if (purchase instanceof Assembly) {
        purchase.materialize();
      }
    });
  }
}
