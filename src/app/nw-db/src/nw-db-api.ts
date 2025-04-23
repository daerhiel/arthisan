import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { getUrl } from '@app/core';
import { NwQueryItem } from './models';

/**
 * Interface representing the version of the NWDB API.
 */
export interface NwDbVersion {
  v: string;
};

/**
 * Interface representing the response from the NWDB API.
 * @template T - The type of the data returned in the response.
 */
export interface Response<T> {
  data: T;
  success: boolean;
}

/**
 * Service to interact with the NWDB API.
 * This service provides methods to get the version of the API and to search for items in the database.
 */
@Injectable({
  providedIn: 'root'
})
export class NwDbApi {
  readonly #http = inject(HttpClient);
  readonly #url = environment.apiNwDbUrl;

  /**
   * Get the version of the NWDB API.
   * @returns The version of the NWDB API.
   */
  getVersion(): Observable<NwDbVersion> {
    return this.#http.get<NwDbVersion>(getUrl(this.#url, 'version.json'));
  }

  /**
   * Get the list of all items in the database.
   * @param query The search query. If not provided, all items are returned.
   * @returns The list of items matching the search query.
   */
  search(query?: string): Observable<Response<NwQueryItem[]>> {
    return this.#http.get<Response<NwQueryItem[]>>(getUrl(this.#url, 'db', ['search', query ?? '[[all]]']));
  }
}
