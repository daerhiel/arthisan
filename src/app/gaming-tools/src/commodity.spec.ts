import { Commodity, indexCommodities } from './commodity'

describe('indexCommodities', () => {
  it('should handle empty array', () => {
    const commodities: Commodity[] = [];

    expect(indexCommodities(commodities)).toEqual({});
  });

  it('should create an index from commodities', () => {
    const commodities: Commodity[] = [
      { id: 'gold', price: 100 },
      { id: 'silver', price: 50 }
    ];

    expect(indexCommodities(commodities)).toEqual({
      gold: 100,
      silver: 50,
    });
  });
});
