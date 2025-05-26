import { Observable, of } from 'rxjs';

import { Commodity, GameServer } from '@app/gaming-tools';

export const commodities: Commodity[] = [
  { id: "gold", price: 100 },
  { id: "silver", price: 50 },
  { id: "IngotT52", price: 0 },
  { id: "OreT52", price: 0 },
  { id: "IngotT5", price: 0 },
  { id: "OreT5", price: 0 },
  { id: "IngotT4", price: 0 },
  { id: "OreT4", price: 0 },
  { id: "IngotT3", price: 0 },
  { id: "IngotT2", price: 4 },
  { id: "OreT1", price: 0.5 },
  { id: "FluxT5", price: 0.1 },
  { id: "SandpaperT5", price: 0.2 },
  { id: "TanninT5", price: 0.3 },
  { id: "SolventT5", price: 0.5 },
  { id: "ClothWeaveT5", price: 0.4 },
  { id: "ReagentConverterT5", price: 0 },
  { id: "CharcoalT1", price: 0 },
  { id: "WoodenCoin", price: 0 },
  { id: "BeeswaxT1", price: 0 },
  { id: "AlchemyFireT1", price: 0 },
  { id: "House_HousingItem_Lighting_CandleHolder_A", price: 0 },
].map(item => ({ id: item.id.toLowerCase(), price: item.price }));

export class GamingToolsApiMock {
  getServers(): Observable<GameServer[]> {
    return of([
      { name: "Server1", age: 100 },
      { name: "Server2", age: 200 },
      { name: "Server3", age: 300 }
    ]);
  }

  getServerPrices(name: string): Observable<Commodity[]> {
    return of(name === "Server1" ? commodities : []);
  }
}
