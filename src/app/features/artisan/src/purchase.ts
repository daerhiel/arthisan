import { computed } from "@angular/core";

import { product, sum } from "@app/core";
import { Persistent } from "./contracts";
import { Materials } from "./materials";
import { Entity } from "./entity";
import { Provision } from "./provision";

/**
 * Represents the state of a purchase.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PurchaseState {
}

/**
 * Represents a purchase request for an entity, which can be a master item or housing.
 * @remarks Purchase contains details about how many items of an entity is required in a crafting operation.
 */
export class Purchase implements Persistent<PurchaseState> {
  readonly #owners: Provision[] = [];

  /**
   * The chance to craft additional items.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get bonus(): number | null { return null; }

  /**
   * The market price of a unit of an entity.
   */
  get price(): number | null { return this.entity.price; }

  /**
   * The total cost of the purchase.
   */
  readonly #cost = computed(() => product(this.price, this.requested()));
  get cost(): number | null { return this.#cost(); }

  /**
   * The number of items requested by the parent provision.
   */
  readonly requested = computed(() => this.#owners
    .filter(x => x.projection.assembly.crafted())
    .reduce<number | null>((s, x) => sum(s, x.volume), null)
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

    this.materials.index(this);
  }

  /**
   * Binds the purchase to a provision.
   * @param provision The provision to bind to.
   * @throws Will throw an error if the provision is invalid.
   * @remarks The binding is required to estimate the amount of materials needed for crafting depending
   * on the crafting tree state and equipment usage.
   */
  bind(provision: Provision) {
    if (!provision) {
      throw new Error('Invalid provision instance.');
    }

    if (!this.#owners.includes(provision)) {
      this.#owners.push(provision);
    }
  }

  /** @inheritdoc */
  getState(): PurchaseState {
    return {};
  }

  /** @inheritdoc */
  setState(state: PurchaseState): void {
    state;
  }
}
