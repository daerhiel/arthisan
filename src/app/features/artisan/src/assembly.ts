import { computed, signal } from '@angular/core';

import { smaller } from '@app/core';
import { Materials } from './materials';
import { Purchase } from './purchase';
import { Craftable } from './craftable';
import { Projection } from './projection';

/**
 * Represents the assembly crafting optimization mode.
 */
export enum OptimizationMode {
  /**
   * Craft all items in a crafting schematics that can be crafted.
   */
  CraftAll
}

/**
 * Represents an assembly of craftable items, which includes projections based on blueprints.
 */
export class Assembly extends Purchase {
  /**
   * The list of projections for this assembly associated with source ingredients.
   */
  readonly projections: Projection[];

  /**
   * The selected projection for this assembly.
   */
  readonly #projection = computed(() =>
    this.projections.reduce((p, c) => smaller(p.cost, c.cost) ? p : c) ?? null
  );
  get projection(): Projection | null { return this.#projection(); }

  /** @inheritdoc */
  override get bonus(): number | null {
    return this.projection?.blueprint.bonus ?? null;
  }

  /**
   * The effective value of the craft based on prices and extra items bonuses.
   */
  readonly #value = computed(() =>
    this.projection?.value ?? null
  );
  get value(): number | null {
    return this.#value();
  }

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
    this.materials.root(this);
    this.projections = entity.blueprints.map(blueprint => blueprint.request(materials));
  }

  /**
   * Optimizes the assembly based on the specified optimization criteria.
   * @param mode The optimization mode to apply.
   */
  optimize(mode: OptimizationMode) {
    if (mode === OptimizationMode.CraftAll) {
      this.crafted.set(true);
    }
    for (const projection of this.projections) {
      projection.optimize(mode);
    }
  }
}
