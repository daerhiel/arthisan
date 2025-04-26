export interface Polygon {
  bbox: [number,number,number,number];
  coordinates: [number,number][][];
  type: string;
}

export interface PositionChunkRef {
  chunkID: number;
  elementCount: number;
  elementOffset: number;
  elementSize: number;
}

export interface ScannedGatherable {
  gatherableID: string;
  spawns: ScannedGatherableSpawn[];
}

export interface ScannedGatherableSpawn {
  encounter: string;
  mapID: string;
  positions: [number,number][];
}

export interface ScannedHouse {
  houseTypeID: string;
  mapID: string;
  position: [number,number];
}

export interface ScannedHouseType {
  houseTypeID: string;
  houses: ScannedHouse[];
}

export interface ScannedLore {
  loreID: string;
  spawns: ScannedLoreSpawn[];
}

export interface ScannedLoreSpawn {
  mapID: string;
  positions: [number,number][];
}

export interface ScannedNpc {
  npcID: string;
  spawns: ScannedNpcSpawn[];
}

export interface ScannedNpcSpawn {
  mapID: string;
  positions: [number,number][];
}

export interface ScannedSpell {
  AreaStatusEffects: string[];
  PrefabPath: string;
}

export interface ScannedStation {
  mapID: string;
  name: string;
  position: [number,number];
  stationID: string;
}

export interface ScannedStationType {
  stationID: string;
  stations: ScannedStation[];
}

export interface ScannedStructure {
  mapID: string;
  name: string;
  position: [number,number];
  type: string;
}

export interface ScannedStructureType {
  structures: ScannedStructure[];
  type: string;
}

export interface ScannedTerritory {
  geometry: Polygon[];
  territoryID: string;
}

export interface ScannedVariation {
  spawns: ScannedVariationSpawn[];
  variantID: string;
}

export interface ScannedVariationSpawn {
  encounter: string;
  mapID: string;
  positions: PositionChunkRef;
}

export interface ScannedVital {
  catIDs: string[];
  gthIDs: string[];
  levels: number[];
  mapIDs: string[];
  models: string[];
  spawns: Record<string, ScannedVitalSpawn[]>;
  tables: string[];
  territories: number[];
  vitalsID: string;
}

export interface ScannedVitalModel {
  adb: string;
  cdf: string;
  id: string;
  mtl: string;
  tags: string[];
  vitalIds: string[];
}

export interface ScannedVitalSpawn {
  c: string[];
  e: string[];
  g: string[];
  l: number[];
  m: string[];
  p: [number,number];
  t: number[];
}

export interface SearchItem {
  gs: string;
  icon: string;
  id: string;
  named: boolean;
  rarity: string;
  subtype: string;
  text: string;
  tier: number;
  type: string;
}
