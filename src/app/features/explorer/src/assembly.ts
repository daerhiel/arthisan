import { MatDialogConfig } from "@angular/material/dialog";

import { defineColumn, defineTable } from "@app/core";
import { getPriceInputs, getRatioInputs, NwIcon, NwPrice, NwRatio } from "@app/nw-buddy";
import { Assembly, getIconInputs, getOpenerInputs, Opener } from "@features/artisan";
import { Schematic } from "@features/schematic";

/**
 * Table definition for assemblies, which includes columns for various attributes of the assembly.
 */
function getMarginState(assembly: Assembly): boolean | null {
  const margin = assembly.margin;
  return margin != null ? margin > 0 : null;
}

/**
 * Dialog configuration for the Schematic component.
 */
const dialog: MatDialogConfig<Assembly> = {
  enterAnimationDuration: 0, exitAnimationDuration: 0,
  maxWidth: '95vw', maxHeight: '94vh'
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
  { width: '5%' }
);

export const assemblyBlueprints = defineColumn<Assembly, number>('entity.blueprints',
  'Recipes',
  { fit: x => x.entity.blueprints.length },
  { width: '2%' }
);

export const assemblyPrice = defineColumn<Assembly, number>('entity.price',
  'Price',
  { component: NwPrice, map: getPriceInputs(x => x.entity.price, { format: '1.2-2' }) },
  { width: '5%', align: 'right' }
);

export const assemblyCost = defineColumn<Assembly, number>('projection.cost',
  'Cost',
  { component: NwPrice, map: getPriceInputs(x => x.cost ?? null, { format: '1.2-2' }) },
  { width: '5%', align: 'right' }
);

export const assemblyMargin = defineColumn<Assembly, number>('projection.margin',
  'Margin',
  { component: NwPrice, map: getPriceInputs(x => x.margin, { getter: getMarginState, format: '1.2-2' }) },
  { width: '5%', align: 'right' }
);

export const assemblyChance = defineColumn<Assembly, number | null>('projection.yieldBonusChance',
  'Chance',
  { component: NwRatio, map: getRatioInputs(x => x.yieldBonusChance, { format: '1.0-2' }) },
  { width: '5%', align: 'right' }
);

export const assemblyTable = defineTable<Assembly>('assemblies',
  assemblyIcon, assemblyName,
  assemblyCategory, assemblyFamily,
  assemblyType, assemblyTier, assemblyBlueprints,
  assemblyPrice, assemblyCost,
  assemblyMargin, assemblyChance
);
