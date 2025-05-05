import { NW_MAX_GEAR_SCORE, NW_MAX_GEAR_SCORE_UPGRADABLE, NW_MIN_GEAR_SCORE, NW_ROLL_PERK_ON_UPGRADE_TIER } from './constants';
import { MasterItemDefinitions } from './types';
import {
  isMasterItem, isItemNamed, isItemArtifact,
  isItemUpgradable, getItemPerkIds, getItemPerkBucketIds, getItemPerkBucketKeys,
  getItemRarity, getItemRarityLabel,
  getItemMaxGearScore, getItemMinGearScore, getItemGearScoreLabel,
  ItemRarity
} from './item'

describe('isMasterItem', () => {
  const tests = [
    { name: 'item with id', input: { ItemID: 1, Name: 'Test Item' }, expected: true },
    { name: 'item without id', input: { Name: 'Test Item' }, expected: false },
    { name: 'item with empty id', input: { ItemID: '', Name: 'Test Item' }, expected: true },
    { name: 'item with null id', input: { ItemID: null, Name: 'Test Item' }, expected: true },
    { name: 'item with undefined id', input: { ItemID: undefined, Name: 'Test Item' }, expected: true },
    { name: 'empty object', input: {}, expected: false }
  ];

  tests.forEach(({ name, input, expected }) => {
    it(`should detect ${name}: ${expected}`, () => {
      expect(isMasterItem(input)).toBe(expected);
    });
  });
});

describe('isItemNamed', () => {
  const tests = [
    { name: 'item with named class', input: { ItemClass: ['Named'] }, expected: true },
    { name: 'item with other class', input: { ItemClass: ['Artifact'] }, expected: false },
    { name: 'item with empty class', input: { ItemClass: [] }, expected: false },
    { name: 'item with undefined class', input: { ItemClass: undefined! }, expected: false },
    { name: 'item with undefined class', input: {} as Pick<MasterItemDefinitions, 'ItemClass'>, expected: false }
  ] satisfies { name: string; input: Pick<MasterItemDefinitions, 'ItemClass'>; expected: boolean; }[];

  tests.forEach(({ name, input, expected }) => {
    it(`should detect ${name}: ${expected}`, () => {
      expect(isItemNamed(input)).toBe(expected);
    });
  });
});

describe('isItemArtifact', () => {
  const tests = [
    { name: 'item with artifact class', input: { ItemClass: ['Artifact'] }, expected: true },
    { name: 'item with other class', input: { ItemClass: ['Named'] }, expected: false },
    { name: 'item with empty class', input: { ItemClass: [] }, expected: false },
    { name: 'item with undefined class', input: { ItemClass: undefined! }, expected: false },
    { name: 'item with undefined class', input: {} as Pick<MasterItemDefinitions, 'ItemClass'>, expected: false }
  ] satisfies { name: string; input: Pick<MasterItemDefinitions, 'ItemClass'>; expected: boolean; }[];

  tests.forEach(({ name, input, expected }) => {
    it(`should detect ${name}: ${expected}`, () => {
      expect(isItemArtifact(input)).toBe(expected);
    });
  });
});

describe('isItemUpgradable', () => {
  const tests = [
    { name: 'item with low tier', input: { Tier: 1 }, expected: false },
    { name: 'item with margin tier', input: { Tier: NW_ROLL_PERK_ON_UPGRADE_TIER - 1, MaxGearScore: NW_MAX_GEAR_SCORE_UPGRADABLE }, expected: false },
    { name: 'item with minimum tier and margin gear score', input: { Tier: NW_ROLL_PERK_ON_UPGRADE_TIER, MaxGearScore: NW_MAX_GEAR_SCORE_UPGRADABLE - 1 }, expected: false },
    { name: 'item with minimum tier and gear score', input: { Tier: NW_ROLL_PERK_ON_UPGRADE_TIER, MaxGearScore: NW_MAX_GEAR_SCORE_UPGRADABLE }, expected: true },
  ] satisfies { name: string; input: Partial<MasterItemDefinitions>; expected: boolean }[];

  tests.forEach(({ name, input, expected }) => {
    it(`should detect ${name}: ${expected}`, () => {
      expect(isItemUpgradable(input as MasterItemDefinitions)).toBe(expected);
    });
  });
});

describe('getItemPerkIds', () => {
  const tests = [
    { name: 'get perk ids', input: { Perk1: 'Perk1', Perk2: 'Perk2' }, expected: ['Perk1', 'Perk2'] }
  ] satisfies { name: string; input: Partial<MasterItemDefinitions>; expected?: string[] }[];

  tests.forEach(({ name, input, expected }) => {
    it(`should ${name}: ${expected}`, () => {
      expect(getItemPerkIds(input as MasterItemDefinitions)).toEqual(expected);
    });
  });
});

describe('getItemPerkBucketIds', () => {
  const tests = [
    { name: 'get perk bucket ids', input: { PerkBucket1: 'PerkBucket1', PerkBucket2: 'PerkBucket2' }, expected: ['PerkBucket1', 'PerkBucket2'] }
  ] satisfies { name: string; input: Partial<MasterItemDefinitions>; expected?: string[] }[];

  tests.forEach(({ name, input, expected }) => {
    it(`should ${name}: ${expected}`, () => {
      expect(getItemPerkBucketIds(input as MasterItemDefinitions)).toEqual(expected);
    });
  });
});

describe('getItemPerkBucketKeys', () => {
  const tests = [
    { name: 'get perk bucket keys', input: { PerkBucket1: 'PerkBucket1', PerkBucket2: 'PerkBucket2' }, expected: ['PerkBucket1', 'PerkBucket2'] }
  ] satisfies { name: string; input: Partial<MasterItemDefinitions>; expected?: string[] }[];

  tests.forEach(({ name, input, expected }) => {
    it(`should ${name}: ${expected}`, () => {
      expect(getItemPerkBucketKeys(input as MasterItemDefinitions)).toEqual(expected);
    });
  });
});

describe('getItemRarity', () => {
  const base: Partial<MasterItemDefinitions> = { ItemID: '1', Tier: NW_ROLL_PERK_ON_UPGRADE_TIER, MaxGearScore: NW_MAX_GEAR_SCORE_UPGRADABLE };
  const tests = [
    { name: 'get rarity for null item', input: null, expected: 'common' },
    { name: 'get forced rarity', input: { ForceRarity: 1 }, expected: 'uncommon' },
    { name: 'get non-master item rarity', input: {}, expected: 'common' },
    { name: 'get common for 0 perks', input: { ItemID: '1' }, expected: 'common' },
    { name: 'get uncommon for 1 perk', input: { ...base }, expected: 'common' },
    { name: 'get rare for 2 perks', input: { ...base, Perk1: 'Perk1', Perk2: 'Perk2' }, expected: 'uncommon' },
    { name: 'get epic for 3 perks', input: { ...base, Perk1: 'Perk1', Perk2: 'Perk2', Perk3: 'Perk3' }, expected: 'rare' },
    { name: 'get legendary for 4 perks', input: { ...base, Perk1: 'Perk1', Perk2: 'Perk2', Perk3: 'Perk3', Perk4: 'Perk4' }, expected: 'epic' },
    { name: 'get artifact for 5 perks', input: { ...base, Perk1: 'Perk1', Perk2: 'Perk2', Perk3: 'Perk3', Perk4: 'Perk4', Perk5: 'Perk5' }, expected: 'legendary' },
    { name: 'get artifact rarity for artifact item', input: { ...base, ItemClass: ['Artifact'] }, expected: 'artifact' }
  ] satisfies { name: string; input?: Partial<MasterItemDefinitions> | null; expected?: string }[];

  tests.forEach(({ name, input, expected }) => {
    it(`should ${name}: ${expected}`, () => {
      expect(getItemRarity((input as unknown as MasterItemDefinitions)!)).toBe(expected);
    });
  });
});

describe('getItemRarityLabel', () => {
  const base: Partial<MasterItemDefinitions> = { ItemID: '1', Tier: NW_ROLL_PERK_ON_UPGRADE_TIER, MaxGearScore: NW_MAX_GEAR_SCORE_UPGRADABLE };
  const tests = [
    { name: 'get rarity for null item', input: null, expected: 'RarityLevel0_DisplayName' },
    { name: 'get forced rarity', input: { ForceRarity: 1 }, expected: 'RarityLevel1_DisplayName' },
    { name: 'get non-master item rarity', input: {}, expected: 'RarityLevel0_DisplayName' },
    { name: 'get common for 0 perks', input: { ItemID: '1' }, expected: 'RarityLevel0_DisplayName' },
    { name: 'get uncommon for 1 perk', input: { ...base }, expected: 'RarityLevel0_DisplayName' },
    { name: 'get rare for 2 perks', input: { ...base, Perk1: 'Perk1', Perk2: 'Perk2' }, expected: 'RarityLevel1_DisplayName' },
    { name: 'get epic for 3 perks', input: { ...base, Perk1: 'Perk1', Perk2: 'Perk2', Perk3: 'Perk3' }, expected: 'RarityLevel2_DisplayName' },
    { name: 'get legendary for 4 perks', input: { ...base, Perk1: 'Perk1', Perk2: 'Perk2', Perk3: 'Perk3', Perk4: 'Perk4' }, expected: 'RarityLevel3_DisplayName' },
    { name: 'get artifact for 5 perks', input: { ...base, Perk1: 'Perk1', Perk2: 'Perk2', Perk3: 'Perk3', Perk4: 'Perk4', Perk5: 'Perk5' }, expected: 'RarityLevel4_DisplayName' },
    { name: 'get artifact rarity for artifact item', input: { ...base, ItemClass: ['Artifact'] }, expected: 'ui_artifact' },
    { name: 'get label for undefined object', input: 'common', expected: 'RarityLevel0_DisplayName' },
    { name: 'get label for undefined object', input: 'uncommon', expected: 'RarityLevel1_DisplayName' },
    { name: 'get label for undefined object', input: 'rare', expected: 'RarityLevel2_DisplayName' },
    { name: 'get label for undefined object', input: 'epic', expected: 'RarityLevel3_DisplayName' },
    { name: 'get label for undefined object', input: 'legendary', expected: 'RarityLevel4_DisplayName' },
    { name: 'get label for undefined object', input: 'artifact', expected: 'ui_artifact' }
  ] satisfies { name: string; input?: Partial<MasterItemDefinitions> | ItemRarity | null; expected?: string }[];

  tests.forEach(({ name, input, expected }) => {
    it(`should ${name}: ${expected}`, () => {
      expect(getItemRarityLabel((input as unknown as MasterItemDefinitions)!)).toBe(expected);
    });
  });
});

describe('getItemMaxGearScore', () => {
  const tests = [
    { name: 'get max gear score', input: { MaxGearScore: 500 }, expected: 500 },
    { name: 'override gear score', input: { GearScoreOverride: 600, MaxGearScore: 500 }, expected: 600 },
    { name: 'fallback to default value', input: {}, fallback: true, expected: NW_MAX_GEAR_SCORE },
    { name: 'fallback to default value by default', input: {}, expected: NW_MAX_GEAR_SCORE },
    { name: 'fallback to null by when no fallback', input: {}, fallback: false, expected: null },
  ] satisfies { name: string; input: Partial<MasterItemDefinitions>; fallback?: boolean; expected?: number | null; }[];

  tests.forEach(({ name, input, fallback, expected }) => {
    it(`should ${name}: ${expected}`, () => {
      expect(getItemMaxGearScore(input as MasterItemDefinitions, fallback)).toBe(expected);
    });
  });
});

describe('getItemMinGearScore', () => {
  const tests = [
    { name: 'get min gear score', input: { MinGearScore: 500 }, expected: 500 },
    { name: 'override gear score', input: { GearScoreOverride: 600, MinGearScore: 500 }, expected: 600 },
    { name: 'fallback to default value', input: {}, fallback: true, expected: NW_MIN_GEAR_SCORE },
    { name: 'fallback to default value by default', input: {}, expected: NW_MIN_GEAR_SCORE },
    { name: 'fallback to null by when no fallback', input: {}, fallback: false, expected: null }
  ] satisfies { name: string; input: Partial<MasterItemDefinitions>; fallback?: boolean; expected?: number | null; }[];

  tests.forEach(({ name, input, fallback, expected }) => {
    it(`should ${name}: ${expected}`, () => {
      expect(getItemMinGearScore(input as MasterItemDefinitions, fallback)).toBe(expected);
    });
  });
});

describe('getItemGearScoreLabel', () => {
  const tests = [
    { name: 'get label for undefined object', input: undefined, expected: '' },
    { name: 'get label for null object', input: null, expected: '' },
    { name: 'override gear score', input: { GearScoreOverride: 600 }, expected: '600' },
    { name: 'get gear score range', input: { MinGearScore: 500, MaxGearScore: 600 }, expected: '500-600' },
    { name: 'get label for same range', input: { MinGearScore: 500, MaxGearScore: 500 }, expected: '500' },
    { name: 'get max gear score label', input: { MaxGearScore: 600 }, expected: '600' },
    { name: 'get min gear score label', input: { MinGearScore: 500 }, expected: '500' },
    { name: 'get empty label', input: {}, expected: '' }
  ] satisfies { name: string; input?: Partial<MasterItemDefinitions> | null; expected?: string; }[]

  tests.forEach(({ name, input, expected }) => {
    it(`should ${name}: ${expected}`, () => {
      expect(getItemGearScoreLabel((input as unknown as MasterItemDefinitions)!)).toBe(expected);
    });
  });
});
