import { TestBed } from '@angular/core/testing';

import { NwBuddyApiMock } from '@app/nw-buddy/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { Artisan } from './artisan';

describe('Artisan', () => {
  let service: Artisan;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NwBuddyApi, useClass: NwBuddyApiMock }
      ]
    });
    service = TestBed.inject(Artisan);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
