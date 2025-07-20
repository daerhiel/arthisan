import { defineColumn, defineTable } from "@app/core";
import { getPriceInputs, NwIcon, NwPrice } from "@app/nw-buddy";
import { Assembly, getIconInputs, getOpenerInputs, Opener } from "@features/artisan";
import { Schematic } from "@features/schematic";

/**
 * Table definition for assemblies, which includes columns for various attributes of the assembly.
 */
function getPriceState(assembly: Assembly): boolean | null {
  const profit = assembly.projection?.profit;
  return profit ? profit > 0 : null;
}

export const assemblyIcon = defineColumn<Assembly>({
  id: 'entity.icon',
  displayName: 'Icon',
  width: '0',
  value: { component: NwIcon, map: assembly => getIconInputs(assembly.entity) }
});

export const assemblyName = defineColumn<Assembly, string>({
  id: 'entity.name',
  displayName: 'Name',
  width: '48%',
  value: { component: Opener, map: getOpenerInputs((x, i18n) => i18n.get(x.entity.name), Schematic, {}) }
});

export const assemblyCategory = defineColumn<Assembly, string>({
  id: 'entity.category',
  displayName: 'Category',
  width: '7%',
  value: { fit: (x, i18n) => i18n.get(x.entity.category, 'CategoryData') }
});

export const assemblyFamily = defineColumn<Assembly, string>({
  id: 'entity.family',
  displayName: 'Family',
  width: '13%',
  value: { fit: (x, i18n) => i18n.get(x.entity.family, 'CategoryData') }
});

export const assemblyType = defineColumn<Assembly, string>({
  id: 'entity.type',
  displayName: 'Type',
  width: '10%',
  value: { fit: (x, i18n) => i18n.get(x.entity.type, 'UI', 'UI_ItemTypeDescription') }
});

export const assemblyTier = defineColumn<Assembly, number>({
  id: 'entity.tier',
  displayName: 'Tier',
  width: '5%',
  align: 'right',
  value: { fit: x => x.entity.tier }
});

export const assemblyPrice = defineColumn<Assembly, number>({
  id: 'entity.price',
  displayName: 'Price',
  width: '5%',
  align: 'right',
  value: { component: NwPrice, map: getPriceInputs(x => x.entity.price()) }
});

export const assemblyBlueprints = defineColumn<Assembly, number>({
  id: 'entity.blueprints',
  displayName: 'Recipes',
  width: '2%',
  value: { fit: x => x.entity.blueprints.length }
});

export const assemblyCost = defineColumn<Assembly, number>({
  id: 'projection.cost',
  displayName: 'Cost',
  width: '5%',
  align: 'right',
  value: { component: NwPrice, map: getPriceInputs(x => x.projection?.cost ?? null) }
});

export const assemblyProfit = defineColumn<Assembly, number>({
  id: 'projection.profit',
  displayName: 'Profit',
  width: '5%',
  align: 'right',
  value: { component: NwPrice, map: getPriceInputs(x => x.projection?.profit, getPriceState) }
});

export const assemblyChance = defineColumn<Assembly, number | null>({
  id: 'projection.chance',
  displayName: 'Chance',
  width: '5%',
  align: 'right',
  value: { fit: x => x.projection?.chance ?? null }
});

export const assemblyTable = defineTable<Assembly>({
  name: 'assemblies',
  columns: [
    assemblyIcon, assemblyName,
    assemblyCategory, assemblyFamily,
    assemblyType, assemblyTier,
    assemblyPrice, assemblyBlueprints,
    assemblyCost, assemblyProfit, assemblyChance
  ]
});
