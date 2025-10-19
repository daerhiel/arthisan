import { inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { AccessorFn } from '@app/core';
import { NwBuddyApi } from './nw-buddy-api';

/**
 * A mapping of localization keys to their corresponding translated strings.
 */
export type Localization = Record<string, string>;

/**
 * A mapping of property paths to translation functions.
 */
export type I18nMap = Record<string, (id: string) => string>;

/**
 * Creates an accessor function that translates string values based on the provided fields map.
 * @param accessor The original accessor function.
 * @param fields The mapping of property paths to translation functions.
 * @returns A new accessor function that applies translations.
 */
export function getAccessor<T>(accessor: AccessorFn<T>, fields: I18nMap): AccessorFn<T> {
  return (item, segments) => {
    const value = accessor(item, segments);
    if (typeof value === 'string') {
      const translate = fields[segments.join('.')];
      if (translate) {
        return translate(value);
      }
    }
    return value;
  };
};

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
    params: this.locale,
    stream: ({ params }) => this.#api.getTranslations(params),
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
