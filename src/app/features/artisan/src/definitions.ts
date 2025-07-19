import { defineColumn, defineTable, referColumns } from '@app/core';
import { getPriceInputs, NwIcon, NwPrice } from '@app/nw-buddy';
import { Entity, getIconInputs } from './entity';
import { Craftable } from './craftable';
import { Assembly } from './assembly';
import { Projection } from './projection';

function getPriceState(projection: Projection): boolean | null {
  const profit = projection.profit;
  return profit ? profit > 0 : null;
}

export const entityIcon = defineColumn<Entity>({
  id: 'icon',
  displayName: 'Icon',
  width: '0',
  value: { component: NwIcon, map: getIconInputs }
});

export const entityName = defineColumn<Entity>({
  id: 'name',
  displayName: 'Name',
  width: '48%',
  value: { fit: (x, i18n) => i18n.get(x.name) }
});

export const entityCategory = defineColumn<Entity>({
  id: 'category',
  displayName: 'Category',
  width: '7%',
  value: { fit: (x, i18n) => i18n.get(x.category, 'CategoryData') }
});

export const entityFamily = defineColumn<Entity>({
  id: 'family',
  displayName: 'Family',
  width: '13%',
  value: {
    fit: (x, i18n) => i18n.get(x.family, 'CategoryData')
  }
});

export const entityType = defineColumn<Entity>({
  id: 'type',
  displayName: 'Type',
  width: '10%',
  value: { fit: (x, i18n) => i18n.get(x.type, 'UI', 'UI_ItemTypeDescription') }
});

export const entityTier = defineColumn<Entity>({
  id: 'tier',
  displayName: 'Tier',
  width: '5%',
  align: 'right',
  value: { fit: x => x.tier }
});

export const entityPrice = defineColumn<Entity>({
  id: 'price',
  displayName: 'Price',
  width: '5%',
  align: 'right',
  value: { component: NwPrice, map: getPriceInputs(x => x.price()) }
});

export const craftableBlueprints = defineColumn<Craftable>({
  id: 'blueprints',
  displayName: 'Recipes',
  width: '2%',
  value: { fit: x => x.blueprints.length.toString() }
});

export const projectionCost = defineColumn<Projection>({
  id: 'cost',
  displayName: 'Cost',
  width: '5%',
  align: 'right',
  value: { component: NwPrice, map: getPriceInputs(x => x.cost) }
});

export const projectionProfit = defineColumn<Projection>({
  id: 'profit',
  displayName: 'Profit',
  width: '5%',
  align: 'right',
  value: { component: NwPrice, map: getPriceInputs(x => x.profit, getPriceState) }
});

export const projectionChance = defineColumn<Projection>({
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
