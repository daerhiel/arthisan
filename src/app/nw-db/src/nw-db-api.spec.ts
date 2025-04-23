import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { NwDbApi } from './nw-db-api';

describe('NwDbApi', () => {
  let service: NwDbApi;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(NwDbApi);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should get version', async () => {
    const version = firstValueFrom(service.getVersion());

    controller.expectOne('https://nwdb.info/version.json').flush({ v: '12345' });

    expect(await version).toEqual({ v: '12345' });
  });

  it('should search', async () => {
    const search = firstValueFrom(service.search('test'));

    controller.expectOne('https://nwdb.info/db/search/test').flush({ data: [], success: true });

    expect(await search).toEqual({ data: [], success: true });
  });

  it('should search all', async () => {
    const search = firstValueFrom(service.search());

    controller.expectOne('https://nwdb.info/db/search/[[all]]').flush({ data: [], success: true });

    expect(await search).toEqual({ data: [], success: true });
  });
});
