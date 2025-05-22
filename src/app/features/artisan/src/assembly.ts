import { computed } from "@angular/core";

import { defineTable, referColumns } from "@app/core";
import {
  columnIcon, columnName, columnCategory, columnFamily,
  columnType, columnTier, columnPrice, columnBlueprints,
  Craftable
} from "./craftable";
import { Projection } from "./projection";

export class Assembly {
  readonly projects = computed(() =>
    this.item.blueprints()?.map(blueprint => new Projection(blueprint)) ?? null
  );

  constructor(readonly item: Craftable) {
    if (!item) {
      throw new Error('Invalid craftable instance.');
    }
  }
}

export const assemblyTable = defineTable<Assembly>({
  name: 'assemblies',
  columns: [
    ...referColumns<Assembly, Craftable>('item',
      columnIcon, columnName, columnCategory, columnFamily,
      columnType, columnTier, columnPrice, columnBlueprints
    )
  ]
});
