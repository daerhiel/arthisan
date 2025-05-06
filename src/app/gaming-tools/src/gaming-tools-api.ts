import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { getUrl } from '@app/core';
import { GameServer } from './game-server';
import { Commodity } from './commodity';

@Injectable({
  providedIn: 'root'
})
export class GamingToolsApi {
  readonly #http: HttpClient = inject(HttpClient);
  readonly #url: string = environment.apiGamingToolsUrl;

  getServers(): Observable<GameServer[]> {
    return this.#http.get<GameServer[]>(getUrl(this.#url, 'prices', ['nwmp', 'servers']));
  }

  getServerPrices(name: string): Observable<Commodity[]> {
    return this.#http.get<Commodity[]>(getUrl(this.#url, 'prices', ['nwmp'], { serverName: name }));
  }
}
