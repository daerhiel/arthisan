import { inject, Pipe, PipeTransform } from '@angular/core';

import { NwI18n } from './nw-i18n';

/**
 * Pipe to localize strings using the @see NwI18n service.
 */
@Pipe({
  name: 'localize'
})
export class LocalizePipe implements PipeTransform {
  readonly #i18n = inject(NwI18n);

  /**
   * Gets the translation value for a specified key.
   * @param key The key to retrieve the translation for.
   * @param prefixes Optional prefixes to prepend to the key.
   * @returns The translated string or the original key if not found.
   */
  transform(id: string, ...prefixes: string[]): unknown {
    return this.#i18n.get(id, ...prefixes);
  }
}
