import { inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { NwBuddyApi } from './nw-buddy-api';

export type Localization = Record<string, string>;

@Injectable({
  providedIn: 'root'
})
export class NwI18n {
  readonly #api = inject(NwBuddyApi)

  /**
   * The locale name to retrieve data for.
   */
  readonly locale = signal('en-us');

  /**
   * The translation strings for the NW Buddy data.
   */
  readonly #strings = rxResource({
    request: this.locale,
    loader: ({ request }) => this.#api.getTranslations(request),
    defaultValue: {}
  });

  /**
   * The loading state of the translation strings.
   */
  readonly isLoading = this.#strings.isLoading;

  /**
   * Gets the translation value for a specified key.
   * @param key The key to retrieve the translation for.
   * @param prefixes Optional prefixes to prepend to the key.
   * @returns The translated string or the original key if not found.
   */
  get(key: string, ...prefixes: string[]): string {
    const strings = this.#strings.value();
    if (key) {
      const id = key.toLowerCase();
      if (prefixes.length) {
        for (const prefix of prefixes) {
          const value = strings[`${prefix.toLowerCase()}_${id}`];
          if (value) {
            return value;
          }
        }
      } else {
        if (/^@/ig.test(id)) {
          const value = strings[id.replace(/^@/ig, '')];
          return value ?? key;
        }
      }
    }
    return key;
  }
}
