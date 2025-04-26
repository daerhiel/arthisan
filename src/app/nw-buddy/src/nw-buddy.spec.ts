import { TestBed } from '@angular/core/testing';

import { NwBuddyApiMock } from '@app/nw-buddy/testing';

import { NwBuddy } from './nw-buddy';
import { NwBuddyApi } from './nw-buddy-api';

describe('NwBuddy', () => {
  let service: NwBuddy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NwBuddyApi, useClass: NwBuddyApiMock }
      ]
    });
    service = TestBed.inject(NwBuddy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
