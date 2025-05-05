export interface Commodity {
  id: string;
  price: number;
}

export type CommodityIndex = Record<string, number>;

export function indexCommodities(commodities: Commodity[]): CommodityIndex {
  const index: CommodityIndex = {};
  for (const commodity of commodities) {
    index[commodity.id] = commodity.price;
  }
  return index;
}
