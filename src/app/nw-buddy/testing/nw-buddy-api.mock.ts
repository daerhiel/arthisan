import { Observable, of } from "rxjs";

import { CraftingRecipeData, DATASHEETS, DataSheetUri, MasterItemDefinitions } from "@app/nw-data";
import { Localization } from "@app/nw-buddy";

function mergeData<T>(store: Record<string, T[]>, value: Record<string, T[]>): Record<string, T[]> {
  return { ...store, ...value };
}

export const translationsEn = {
  'item_name1': 'Item Name 1',
  'item_name2': 'Item Name 2'
}

export class NwBuddyApiMock {
  readonly data = {
    [DATASHEETS.MasterItemDefinitions.MasterItemDefinitions_Common.uri]: [
      { ItemID: 'test' },
    ] satisfies Partial<MasterItemDefinitions>[],
    [DATASHEETS.CraftingRecipeData.CraftingRecipes.uri]: [
      { RecipeID: 'test' },
    ] satisfies Partial<CraftingRecipeData>[]
  };

  private readonly _getDataSheet = <T>([key, value]: [string, DataSheetUri<T>]): Record<string, T[]> => {
    return { [key]: this.data[value.uri] as T[] };
  }

  getTranslations(locale: string): Observable<Localization> {
    return of(locale === 'en-us' ? translationsEn : {});
  }

  getDataSheets<T>(set: Record<string, DataSheetUri<T>>): Observable<Record<string, T[]>> {
    return of(Object.entries(set).map(this._getDataSheet).reduce(mergeData, {}));
  }
}
