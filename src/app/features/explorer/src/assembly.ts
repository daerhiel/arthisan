import { MatDialogConfig } from "@angular/material/dialog";

import { defineColumn, defineTable } from "@app/core";
import { getPriceInputs, NwIcon, NwPrice } from "@app/nw-buddy";
import { Assembly, getIconInputs, getOpenerInputs, Opener } from "@features/artisan";
import { Schematic } from "@features/schematic";

/**
 * Table definition for assemblies, which includes columns for various attributes of the assembly.
 */
function getPriceState(assembly: Assembly): boolean | null {
  const profit = assembly.projection?.profit;
  return profit != null ? profit > 0 : null;
}

/**
 * Dialog configuration for the Schematic component.
 */
const dialog: MatDialogConfig<Assembly> = {
  enterAnimationDuration: 0, exitAnimationDuration: 0,
  position: { top: '9rem' }, maxWidth: '95vw', maxHeight: '84vh'
};

export const assemblyIcon = defineColumn<Assembly>('entity.icon',
  'Icon',
  { component: NwIcon, map: assembly => getIconInputs(assembly.entity) },
  { width: '0' }
);

export const assemblyName = defineColumn<Assembly, string>('entity.name',
  'Name',
  { component: Opener, map: getOpenerInputs((x, i18n) => i18n.get(x.entity.name), Schematic, dialog) },
  { width: '48%' }
);

export const assemblyCategory = defineColumn<Assembly, string>('entity.category',
  'Category',
  { fit: (x, i18n) => i18n.get(x.entity.category, 'CategoryData') },
  { width: '7%' }
);

export const assemblyFamily = defineColumn<Assembly, string>('entity.family',
  'Family',
  { fit: (x, i18n) => i18n.get(x.entity.family, 'CategoryData') },
  { width: '13%' }
);

export const assemblyType = defineColumn<Assembly, string>('entity.type',
  'Type',
  { fit: (x, i18n) => i18n.get(x.entity.type, 'UI', 'UI_ItemTypeDescription') },
  { width: '10%' }
);

export const assemblyTier = defineColumn<Assembly, number>('entity.tier',
  'Tier',
  { fit: x => x.entity.tier },
  { width: '5%', align: 'right', }
);


export const assemblyPrice = defineColumn<Assembly, number>('entity.price',
  'Price',
  { component: NwPrice, map: getPriceInputs(x => x.entity.price) },
  { width: '5%', align: 'right' }
);

export const assemblyBlueprints = defineColumn<Assembly, number>('entity.blueprints',
  'Recipes',
  { fit: x => x.entity.blueprints.length },
  { width: '2%' }
);

export const assemblyCost = defineColumn<Assembly, number>('projection.cost',
  'Cost',
  { component: NwPrice, map: getPriceInputs(x => x.cost ?? null) },
  { width: '5%', align: 'right' }
);

export const assemblyProfit = defineColumn<Assembly, number>('projection.profit',
  'Profit',
  { component: NwPrice, map: getPriceInputs(x => x.profit, getPriceState) },
  { width: '5%', align: 'right' }
);

export const assemblyChance = defineColumn<Assembly, number | null>('projection.chance',
  'Chance',
  { fit: x => x.projection?.chance ?? null },
  { width: '5%', align: 'right' }
);

export const assemblyTable = defineTable<Assembly>('assemblies',
  assemblyIcon, assemblyName,
  assemblyCategory, assemblyFamily,
  assemblyType, assemblyTier,
  assemblyPrice, assemblyBlueprints,
  assemblyCost, assemblyProfit, assemblyChance
);
