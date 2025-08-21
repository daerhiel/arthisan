import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { environment } from '@environments/environment';
import { NwBuddyApi } from './nw-buddy-api';

describe('NwBuddyApi', () => {
  let service: NwBuddyApi;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(NwBuddyApi);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should get localization data', async () => {
    const locale = 'en-us';
    const localization = firstValueFrom(service.getTranslations(locale));

    controller.expectOne(`${environment.apiNwBuddyUrl}/nw-data/localization/en-us.json`).flush({ data: '12345' });

    expect(await localization).toEqual({ data: '12345' });
  });

  it('should get data sheets', async () => {
    const set = {
      item: { uri: 'item.json' },
      recipe: { uri: 'recipe.json' }
    };
    const dataSheets = firstValueFrom(service.getDataSheets(set));

    controller.expectOne(`${environment.apiNwBuddyUrl}/nw-data/item.json`).flush([{ data: 'item' }]);
    controller.expectOne(`${environment.apiNwBuddyUrl}/nw-data/recipe.json`).flush([{ data: 'recipe' }]);

    expect(await dataSheets).toEqual({
      item: [{ data: 'item' }],
      recipe: [{ data: 'recipe' }]
    });
  });
});
