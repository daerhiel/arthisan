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

export class Assembly {
  readonly #projections = computed(() =>
    this.craftable.blueprints()?.map(blueprint => new Projection(blueprint)) ?? null
  );
  get projections(): Projection[] | null {
    return this.#projections();
  }

  readonly #projection = computed(() =>
    this.projections?.reduce((p, c) => greater(p.cost, c.cost) ? p : c) ?? null
  );
  get projection(): Projection | null {
    return this.#projection();
  }

  constructor(readonly craftable: Craftable) {
    if (!craftable) {
      throw new Error('Invalid craftable instance.');
    }
  }
}

export const assemblyTable = defineTable<Assembly>({
  name: 'assemblies',
  columns: [
    ...referColumns<Assembly, Craftable>('craftable',
      craftableIcon, craftableName, craftableCategory, craftableFamily,
      craftableType, craftableTier, craftablePrice, craftableBlueprints
    ),
    ...referColumns<Assembly, Projection>('projection',
      projectionCost, projectionProfit, projectionChance
    )
  ]
});
