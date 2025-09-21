import { computed } from "@angular/core";

import { product, sum } from "@app/core";
import { Persistent } from "./contracts";
import { Entity } from "./entity";
import { Materials } from "./materials";
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
  /**
   * The list of provisions that the current purchase can be requested with.
   */
  readonly #provisions: Provision[] = [];

  /**
   * The list of provisions that the current purchase is actually crafted in.
   */
  protected get provided(): Provision[] {
    return this.#provisions;
  }

  /**
   * The market price of a unit of an entity.
   */
  get price(): number | null { return this.entity.price; }

  /**
   * The total value of materials requested for this purchase.
   */
  get total(): number | null { return this.#total(); }
  readonly #total = computed(() => product(this.value, this.requested()));

  /**
   * The unit value of the current purchase.
   */
  get value(): number | null { return this.entity.price; }

  /**
   * The number of items requested by the parent provision.
   */
  readonly requested = computed(() =>
    this.provided.reduce<number | null>((s, x) => sum(s, x.volume), null)
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

    if (!this.#provisions.includes(provision)) {
      this.#provisions.push(provision);
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
