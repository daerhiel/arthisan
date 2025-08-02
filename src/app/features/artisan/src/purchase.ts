import { computed, signal } from "@angular/core";

import { product } from "@app/core";
import { Materials } from "./materials";
import { Entity } from "./entity";

/**
 * Represents a purchase request for an entity, which can be a master item or housing.
 * @remarks Purchase contains details about how many items of an entity is required in a crafting operation.
 */
export class Purchase {
  /**
   * The chance to craft additional items.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get bonus(): number | null {
    return null;
  }

  /**
   * The market price of a unit of an entity.
   */
  get price(): number | null {
    return this.entity.price();
  }

  /**
   * The number of items requested by the parent provision.
   */
  readonly requested = signal(0);

  /**
   * The total cost of the purchase.
   */
  readonly cost = computed(() =>
    product(this.price, this.requested())
  );

  /**
   * Creates a new Purchase instance.
   * @param entity The entity associated with this purchase.
   * @param materials The materials required for this craft.
   * @throws Will throw an error if the entity is invalid.
   * @throws Will throw an error if the materials are invalid.
   */
  constructor(readonly entity: Entity, readonly materials: Materials) {
    if (!entity) {
      throw new Error('Invalid entity instance.');
    }
    if (!materials) {
      throw new Error('Invalid materials instance.');
    }
  }
}
