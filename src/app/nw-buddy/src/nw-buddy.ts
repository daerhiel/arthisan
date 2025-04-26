import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { NwBuddyApi } from './nw-buddy-api';
import { DATASHEETS } from '@app/nw-data';

/**
 * Represents the NW Buddy module that provides New World database functionality.
 */
@Injectable({
  providedIn: 'root'
})
export class NwBuddy {
  readonly #api = inject(NwBuddyApi)

  /**
   * The translations for the NW Buddy data.
   */
  readonly translations = toSignal(this.#api.getTranslations('en-us'), { initialValue: {} });

  /**
   * The crafting recipe data.
   */
  readonly crafting = toSignal(this.#api.getDataSheets(DATASHEETS.CraftingRecipeData), { initialValue: null });
}
