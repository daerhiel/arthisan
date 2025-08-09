import { computed, signal } from '@angular/core';

import { smaller } from '@app/core';
import { Persistent } from './contracts';
import { Materials } from './materials';
import { Purchase, PurchaseState } from './purchase';
import { Craftable } from './craftable';
import { Projection } from './projection';

/**
 * Represents the state of an assembly.
 */
export interface AssemblyState extends PurchaseState {
  crafted: boolean;
}

/**
 * Represents an assembly of craftable items, which includes projections based on blueprints.
 */
export class Assembly extends Purchase implements Persistent<AssemblyState> {
  /**
   * The list of projections for this assembly associated with source ingredients.
   */
  readonly projections: Projection[];

  /**
   * The selected projection for this assembly.
   */
  readonly #projection = computed(() =>
    this.projections.reduce((p, c) => smaller(p.cost, c.cost) ? p : c)
  );
  get projection(): Projection | null { return this.#projection(); }

  /** @inheritdoc */
  override get bonus(): number | null {
    return this.projection?.blueprint.bonus ?? null;
  }

  /**
   * The effective value of the craft based on prices and extra items bonuses.
   */
  readonly #value = computed(() => this.projection?.value ?? null);
  get value(): number | null { return this.#value(); }

  /**
   * Indicates whether the assembly has been crafted or purchased on the market.
   */
  readonly crafted = signal(false);

  /**
   * Creates a new Assembly instance.
   * @param entity The craftable entity associated with this assembly.
   * @param materials The materials required for this craft.
   * @throws Will throw an error if the entity is invalid.
   */
  constructor(override readonly entity: Craftable, materials?: Materials) {
    super(entity, materials ??= new Materials());
    this.projections = entity.blueprints.map(blueprint => blueprint.request(materials));
  }


  /** @inheritdoc */
  override getState(): AssemblyState {
    return { crafted: this.crafted() };
  }

  /** @inheritdoc */
  override setState(state: AssemblyState): void {
    state && this.crafted.set(state.crafted);
  }
}
