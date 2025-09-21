import { computed, signal } from '@angular/core';

import { Persistent } from './contracts';
import { Craftable } from './craftable';
import { Materials } from './materials';
import { Purchase, PurchaseState } from './purchase';
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
   * Indicates whether the assembly has been crafted or purchased on the market.
   */
  readonly crafted = signal(false);

  /**
   * Indicates whether to evaluate crafting volume based on extra item chances.
   */
  readonly boosted = signal(true);

  /**
   * The selected projection for this assembly.
  */
  get projection(): Projection | null {
    return this.#projection();
  }
  readonly #projection = computed(() =>
    // TODO: Strategy for selecting projection
    // this.projections.reduce((p, c) => smaller(p.cost, c.cost) ? p : c)
    this.projections[0]
  );

  /**
   * The cumulative chance to craft additional items for the selected projection.
   */
  get yieldBonusChance(): number | null {
    return this.#yieldBonusChance();
  }
  readonly #yieldBonusChance = computed(() =>
    this.#projection()?.yieldBonusChance ?? null
  );

  /**
   * The effective volume of materials required for the projection based on the craft parameters.
   */
  get effective(): number | null {
    return this.#effective();
  }
  readonly #effective = computed(() =>
    this.#projection()?.effective ?? null
  );

  /**
   * The crafting cost of craft calculated from the provisions.
   */
  get cost(): number | null {
    return this.#cost();
  }
  readonly #cost = computed(() =>
    this.#projection()?.cost ?? null
  );

  /**
   * The true value of unit based on crafting state, prices and extra items bonuses.
   */
  override get value(): number | null {
    return this.#value();
  }
  readonly #value = computed(() =>
    this.crafted() ? this.#projection()?.cost ?? null : this.price
  );

  /**
   * The unit differential between the crafting cost and the market price.
   */
  get margin(): number | null {
    return this.#margin();
  }
  readonly #margin = computed(() => {
    return this.#projection()?.margin ?? null;
  });

  /**
   * The crafting profit of the the assembly based crafting state and parameters.
   */
  get profit(): number | null {
    return this.#profit();
  }
  readonly #profit = computed(() =>
    this.#projection()?.profit ?? null
  );

  /**
   * Creates a new Assembly instance.
   * @param entity The craftable entity associated with this assembly.
   * @param materials The materials required for this craft.
   * @throws Will throw an error if the entity is invalid.
   */
  constructor(override readonly entity: Craftable, materials?: Materials) {
    super(entity, materials ??= new Materials());

    this.projections = entity.blueprints.map(blueprint => blueprint.request(this, materials));
  }

  /**
   * Toggles the boosted state of the assembly.
   */
  toggle(): void {
    this.boosted.set(!this.boosted());
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
