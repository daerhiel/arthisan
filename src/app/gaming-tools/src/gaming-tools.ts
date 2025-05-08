import { inject, Injectable, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, retry } from 'rxjs';

import { Broadcast, getStorageItem, handleError, retryStrategy, setStorageItem } from '@app/core';
import { GamingToolsApi } from './gaming-tools-api';
import { GameServer } from './game-server';
import { CommodityIndex, indexCommodities } from './commodity';

export const GAME_SERVER_PROPERTY_NAME = 'game.server';

@Injectable({
  providedIn: 'root'
})
export class GamingTools {
  readonly #broadcast = inject(Broadcast);
  readonly #api = inject(GamingToolsApi);

  readonly #server = signal(getStorageItem<GameServer | null>(GAME_SERVER_PROPERTY_NAME, null));

  /**
   * The list of available game servers.
   */
  readonly servers = toSignal(this.#api.getServers().pipe(
    retry(retryStrategy({ delay: 3000, count: 3, span: 5000 })),
    catchError(handleError(this.#broadcast, []))
  ));
  readonly server = this.#server.asReadonly();

  /**
   * The index of commodities for the selected server.
   */
  readonly #commodities = rxResource({
    request: this.#server,
    loader: ({ request }) => request ? this.#api.getServerPrices(request.name).pipe(
      map(x => indexCommodities(x)),
      retry(retryStrategy({ delay: 3000, count: 3, span: 5000 })),
      catchError(handleError<CommodityIndex>(this.#broadcast, {}))
    ) : of<CommodityIndex>({}),
    defaultValue: {}
  });
  readonly commodities = this.#commodities.value.asReadonly();

  /**
   * The loading state of the translation strings.
   */
  readonly isLoading = this.#commodities.isLoading;

  select(server: GameServer): void {
    this.#server.set(server);
    setStorageItem(GAME_SERVER_PROPERTY_NAME, this.#server());
  }
}
