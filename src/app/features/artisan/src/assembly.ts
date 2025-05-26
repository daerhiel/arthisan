import { computed } from '@angular/core';

import { defineTable, greater, referColumns } from '@app/core';
import {
  craftableIcon, craftableName, craftableCategory, craftableFamily,
  craftableType, craftableTier, craftablePrice, craftableBlueprints,
  Craftable
} from './craftable';
import {
  projectionCost, projectionProfit, projectionChance,
  Projection
} from './projection';

/**
 * Represents an assembly of craftable items, which includes projections based on blueprints.
 */
export class Assembly {
  /**
   * The list of projections for this assembly associated with source ingredients.
   */
  readonly #projections = computed(() =>
    this.entity.blueprints()?.map(blueprint => new Projection(blueprint)) ?? null
  );
  get projections(): Projection[] | null {
    return this.#projections();
  }

  /**
   * The selected projection for this assembly.
   */
  readonly #projection = computed(() =>
    this.projections?.reduce((p, c) => greater(p.cost, c.cost) ? p : c) ?? null
  );
  get projection(): Projection | null {
    return this.#projection();
  }

  /**
   * Creates a new Assembly instance.
   * @param entity The craftable entity associated with this assembly.
   * @throws Will throw an error if the entity is invalid.
   */
  constructor(readonly entity: Craftable) {
    if (!entity) {
      throw new Error('Invalid craftable instance.');
    }
  }
}

export const assemblyTable = defineTable<Assembly>({
  name: 'assemblies',
  columns: [
    ...referColumns<Assembly, Craftable>('entity',
      craftableIcon, craftableName, craftableCategory, craftableFamily,
      craftableType, craftableTier, craftablePrice, craftableBlueprints
    ),
    ...referColumns<Assembly, Projection>('projection',
      projectionCost, projectionProfit, projectionChance
    )
  ]
});
