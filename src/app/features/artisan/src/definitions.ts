import { defineColumn, defineTable, referColumns } from '@app/core';
import { getPriceInputs, NwIcon, NwPrice } from '@app/nw-buddy';
import { Schematic } from '@features/schematic';
import { Opener, getOpenerInputs } from './opener';
import { Entity, getIconInputs } from './entity';
import { Craftable } from './craftable';
import { Assembly } from './assembly';
import { Projection } from './projection';

function getPriceState(projection: Projection): boolean | null {
  const profit = projection.profit;
  return profit ? profit > 0 : null;
}

export const entityIcon = defineColumn<Entity, string>({
  id: 'icon',
  displayName: 'Icon',
  width: '0',
  value: { component: NwIcon, map: getIconInputs }
});

export const entityName = defineColumn<Entity, string>({
  id: 'name',
  displayName: 'Name',
  width: '48%',
  value: { component: Opener, map: getOpenerInputs((x, i18n) => i18n.get(x.name), Schematic, {}) }
});

export const entityCategory = defineColumn<Entity, string>({
  id: 'category',
  displayName: 'Category',
  width: '7%',
  value: { fit: (x, i18n) => i18n.get(x.category, 'CategoryData') }
});

export const entityFamily = defineColumn<Entity, string>({
  id: 'family',
  displayName: 'Family',
  width: '13%',
  value: { fit: (x, i18n) => i18n.get(x.family, 'CategoryData') }
});

export const entityType = defineColumn<Entity, string>({
  id: 'type',
  displayName: 'Type',
  width: '10%',
  value: { fit: (x, i18n) => i18n.get(x.type, 'UI', 'UI_ItemTypeDescription') }
});

export const entityTier = defineColumn<Entity, number>({
  id: 'tier',
  displayName: 'Tier',
  width: '5%',
  align: 'right',
  value: { fit: x => x.tier }
});

export const entityPrice = defineColumn<Entity, number>({
  id: 'price',
  displayName: 'Price',
  width: '5%',
  align: 'right',
  value: { component: NwPrice, map: getPriceInputs(x => x.price()) }
});

export const craftableBlueprints = defineColumn<Craftable, number>({
  id: 'blueprints',
  displayName: 'Recipes',
  width: '2%',
  value: { fit: x => x.blueprints.length }
});

export const projectionCost = defineColumn<Projection, number>({
  id: 'cost',
  displayName: 'Cost',
  width: '5%',
  align: 'right',
  value: { component: NwPrice, map: getPriceInputs(x => x.cost) }
});

export const projectionProfit = defineColumn<Projection, number>({
  id: 'profit',
  displayName: 'Profit',
  width: '5%',
  align: 'right',
  value: { component: NwPrice, map: getPriceInputs(x => x.profit, getPriceState) }
});

export const projectionChance = defineColumn<Projection, number | null>({
  id: 'chance',
  displayName: 'Chance',
  width: '5%',
  align: 'right',
  value: { fit: x => x.chance }
});

export const assemblyTable = defineTable<Assembly>({
  name: 'assemblies',
  columns: [
    ...referColumns<Assembly, Craftable>('entity',
      entityIcon, entityName, entityCategory, entityFamily,
      entityType, entityTier, entityPrice, craftableBlueprints
    ),
    ...referColumns<Assembly, Projection>('projection',
      projectionCost, projectionProfit, projectionChance
    )
  ]
});
