import {
  NW_ITEM_RARITY_DATA,
  NW_MAX_GEAR_SCORE, NW_MAX_GEAR_SCORE_UPGRADABLE, NW_MIN_GEAR_SCORE,
  NW_ROLL_PERK_ON_UPGRADE_PERK_COUNT, NW_ROLL_PERK_ON_UPGRADE_TIER
} from './constants';
import { HouseItems, MasterItemDefinitions } from './types';

export type StartsWith<T, P extends string> = T extends `${P}${string}` ? T : never;
export type StartsNotWith<T, P extends string> = T extends `${P}${string}` ? never : T;

export type PickByPrefix<T, P extends string> = {
  [K in keyof T as StartsWith<K, P>]: T[K]
};
export type OmitByPrefix<T, P extends string> = {
  [K in keyof T as StartsNotWith<K, P>]: T[K]
};

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'artifact'
const ITEM_RARITIES: ItemRarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'artifact']
const ITEM_RARITY_LABELS: Record<ItemRarity, string> = {
  common: `RarityLevel0_DisplayName`,
  uncommon: `RarityLevel1_DisplayName`,
  rare: `RarityLevel2_DisplayName`,
  epic: `RarityLevel3_DisplayName`,
  legendary: `RarityLevel4_DisplayName`,
  artifact: `ui_artifact`,
}

export function isMasterItem(item: unknown): item is MasterItemDefinitions {
  return item != null && typeof item === 'object' && 'ItemID' in item;
}

export function isHousingItem(item: unknown): item is HouseItems {
  return item != null && typeof item === 'object' && 'HouseItemID' in item;
}

export function isItemNamed(item: Pick<MasterItemDefinitions, 'ItemClass'> | null) {
  return item?.ItemClass?.includes('Named') ?? false;
}

export function isItemArtifact(item: Pick<MasterItemDefinitions, 'ItemClass'> | null) {
  return item?.ItemClass?.includes('Artifact') ?? false;
}

export function isItemUpgradable(item: MasterItemDefinitions) {
  if (item.Tier < NW_ROLL_PERK_ON_UPGRADE_TIER) {
    return false;
  }
  if (getItemMaxGearScore(item, false)! < NW_MAX_GEAR_SCORE_UPGRADABLE) {
    return false;
  }
  return true;
}

const PERK_KEYS: (keyof PickByPrefix<MasterItemDefinitions, 'Perk'>)[] = [
  'Perk1',
  'Perk2',
  'Perk3',
  'Perk4',
  'Perk5',
];
const PERK_BUCKET_KEYS: (keyof PickByPrefix<MasterItemDefinitions, 'PerkBucket'>)[] = [
  'PerkBucket1',
  'PerkBucket2',
  'PerkBucket3',
  'PerkBucket4',
  'PerkBucket5',
];

export function getItemPerkIds(item: MasterItemDefinitions): string[] {
  const result: string[] = [];
  for (const key of PERK_KEYS) {
    if (item && item[key]) {
      result.push(item[key]);
    }
  }
  return result;
}

export function getItemPerkBucketIds(item: MasterItemDefinitions) {
  const result = [];
  for (const key of PERK_BUCKET_KEYS) {
    if (item && item[key]) {
      result.push(item[key]);
    }
  }
  return result;
}

export function getItemPerkBucketKeys(item: MasterItemDefinitions): string[] {
  const result: string[] = [];
  for (const key of PERK_BUCKET_KEYS) {
    if (item && key in item) {
      result.push(key);
    }
  }
  return result;
}

export function getItemRarity(item: MasterItemDefinitions | HouseItems | null, itemPerkIds?: string[]): ItemRarity {
  if (!item) {
    return ITEM_RARITIES[0];
  }
  if (item.ForceRarity) {
    return ITEM_RARITIES[item.ForceRarity];
  }
  if (!isMasterItem(item)) {
    return ITEM_RARITIES[0];
  }
  if (isItemArtifact(item)) {
    return 'artifact';
  }

  if (!itemPerkIds) {
    itemPerkIds = getItemPerkIds(item);
  }

  let rarity = 0;
  const maxRarity = NW_ITEM_RARITY_DATA.length - 1;
  let perkCount = itemPerkIds.length;
  if (!isItemUpgradable(item)) {
    perkCount = Math.min(perkCount, NW_ROLL_PERK_ON_UPGRADE_PERK_COUNT);
  }
  for (let i = 0; i < NW_ITEM_RARITY_DATA.length; i++) {
    if (perkCount <= NW_ITEM_RARITY_DATA[i].maxPerkCount) {
      rarity = i;
      break;
    }
  }
  rarity = Math.min(rarity, maxRarity);
  return ITEM_RARITIES[rarity];
}

export function getItemRarityLabel(item: MasterItemDefinitions | HouseItems | ItemRarity): string {
  if (typeof item === 'string') {
    return ITEM_RARITY_LABELS[item];
  }
  return ITEM_RARITY_LABELS[getItemRarity(item)];
}

export function getItemMaxGearScore(item: MasterItemDefinitions, fallback = true) {
  return item?.GearScoreOverride || item?.MaxGearScore || (fallback ? NW_MAX_GEAR_SCORE : null);
}

export function getItemMinGearScore(item: MasterItemDefinitions, fallback = true) {
  return item?.GearScoreOverride || item?.MinGearScore || (fallback ? NW_MIN_GEAR_SCORE : null);
}

export function getItemGearScoreLabel(item: MasterItemDefinitions) {
  if (!item) {
    return '';
  }
  if (item.GearScoreOverride) {
    return String(item.GearScoreOverride);
  }
  if (item.MinGearScore && item.MaxGearScore && item.MinGearScore !== item.MaxGearScore) {
    return `${item.MinGearScore}-${item.MaxGearScore}`;
  }
  return String(item.MaxGearScore || item.MinGearScore || '');
}
