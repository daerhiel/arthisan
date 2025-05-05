import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, mergeMap, Observable, reduce } from 'rxjs';

import { environment } from '@environments/environment';
import { getUrl } from '@app/core';
import { DataSheetUri } from '@app/nw-data';
import { Localization } from './nw-i18n';

/**
 * Merges two data stores into one.
 * @param store The existing data store.
 * @param value The new data to merge.
 * @returns The merged data store.
 */
function mergeData<T>(store: Record<string, T[]>, value: Record<string, T[]>): Record<string, T[]> {
  return { ...store, ...value };
};

/**
 * Interface representing the version of the NW Buddy API.
 */
@Injectable({
  providedIn: 'root'
})
export class NwBuddyApi {
  readonly #http = inject(HttpClient);
  readonly #url = environment.apiNwBuddyUrl;

  /**
   * Gets the localization data for a specific language.
   * @param locale The locale name to retrieve data for. I.e. 'en-us'.
   * @returns A localization data received.
   */
  getTranslations(locale: string): Observable<Localization> {
    return this.#http.get<Localization>(getUrl(this.#url, 'nw-data', ['localization', `${locale}.json`]));
  }

  /**
   * Gets the data sheets for the specified set of URIs.
   * @param set The set of data sheet URIs to retrieve data for.
   * @returns A set of data sheets received.
   */
  getDataSheets<T>(set: Record<string, DataSheetUri<T>>): Observable<Record<string, T[]>> {
    return from(Object.entries(set)).pipe(
      mergeMap(([key, value]) => this.#http.get<T[]>(getUrl(this.#url, 'nw-data', value.uri.split('/'))).pipe(
        map(object => ({ [key]: object }))
      )),
      reduce(mergeData, {})
    );
  }
}
