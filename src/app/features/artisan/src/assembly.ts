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
  get projection(): Projection | null { return this.#projection(); }
  readonly #projection = computed(() =>
    this.projections.reduce((p, c) => smaller(p.cost, c.cost) ? p : c)
  );

  /**
   * The cumulative chance to craft additional items for the selected projection.
   */
  get chance(): number | null {
    return this.#chance();
  }
  readonly #chance = computed(() => this.#projection()?.chance ?? null);

  /**
   * The effective volume of materials required for the projection based on the craft parameters.
   */
  get effective(): number | null {
    return this.#effective();
  }
  readonly #effective = computed(() => this.#projection()?.effective ?? null);

  /**
   * The effective value of the craft based on prices and extra items bonuses.
   */
  get value(): number | null {
    return this.#value();
  }
  readonly #value = computed(() => this.#projection()?.value ?? null);

  /**
   * The projected profit relative to market prices.
   */
  get profit(): number | null {return this.#profit();}
  readonly #profit = computed(() => this.#projection()?.profit ?? null);

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
