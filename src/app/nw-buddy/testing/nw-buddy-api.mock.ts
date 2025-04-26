import { Observable, of } from "rxjs";

import { Localization } from "@app/nw-buddy";
import { DataSheetUri } from "@app/nw-data";

export class NwBuddyApiMock {
  getTranslations(): Observable<Localization> {
    return of({});
  }

  getDataSheets<T, K extends keyof T>(set: Record<string, DataSheetUri<T>>): Observable<Record<K, T>> {
    const mockData: Record<K, T> = {} as Record<K, T>;
    for (const key in set) {
      mockData[key as K] = {} as T;
    }
    return of(mockData);
  }
}
