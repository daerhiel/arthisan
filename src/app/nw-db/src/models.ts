export type Tier = 1 | 2 | 3 | 4 | 5 | 100;
export type Rarity = 0 | 1 | 2 | 3 | 4 | 5;

export type ObjectType =
  | 'item'
  | 'recipe'
  | 'quest'
  | 'currency'
  | 'category'
  | 'perk'
  | 'tradeskill';

export type NwItemType =
  | 'Resource'
  | 'Weapon'
  | 'Armor'
  | 'HousingItem';

export type TradeSkill =
  | 'Armoring'
  | 'Engineering'
  | 'Weaponsmithing'
  | 'Arcana'
  | 'Cooking'
  | 'Weaving'
  | 'Leatherworking'
  | 'Smelting'
  | 'Stonecutting'
  | 'Woodworking';

export interface NwItemRef {
  id: string;
  type: ObjectType;
}

export interface NwItemIcon {
  icon?: string;
  rarity?: Rarity;
}

export interface NwItemBase extends NwItemRef, NwItemIcon {
  itemType?: NwItemType;
  name: string;
  tier?: Tier;
}

export interface NwQueryItem extends NwItemBase {
  level?: number;
  gearScore?: number | null;
  recipeLevel: number;
  recipeSkill: TradeSkill;
  searchRank: number;
}
