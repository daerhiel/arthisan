import { Observable, of } from "rxjs";

import { Commodity, GameServer } from "@app/gaming-tools";

export class GamingToolsApiMock {
  getServers(): Observable<GameServer[]> {
    return of([
      { name: "Server1", age: 100 },
      { name: "Server2", age: 200 },
      { name: "Server3", age: 300 }
    ]);
  }

  getServerPrices(name: string): Observable<Commodity[]> {
    return of(name === "Server1" ? [
      { id: "gold", price: 100 },
      { id: "silver", price: 50 }
    ] : []);
  }
}
