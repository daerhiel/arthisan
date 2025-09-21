import { ApplicationInitStatus, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { initializeNwBuddy, NwBuddyApiMock } from '@app/nw-buddy/testing';

import { NwBuddyApi } from './nw-buddy-api';
import { LocalizePipe } from './localize-pipe';

describe('LocalizePipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideAppInitializer(initializeNwBuddy),
        { provide: NwBuddyApi, useClass: NwBuddyApiMock }
      ]
    });
  });

  beforeEach(async () => {
    await TestBed.inject(ApplicationInitStatus).donePromise;
  });

  it('create an instance', () => {
    TestBed.runInInjectionContext(() => {
      const pipe = new LocalizePipe();
      expect(pipe).toBeTruthy();
    });
  });

  it('should return the value for missing key', () => {
    TestBed.runInInjectionContext(() => {
      const key = '';
      const pipe = new LocalizePipe();
      const result = pipe.transform(key);
      expect(result).toBe(key);
    });
  });

  it('should return the value for non-key', () => {
    TestBed.runInInjectionContext(() => {
      const key = 'item_name1';
      const pipe = new LocalizePipe();
      const result = pipe.transform(key);
      expect(result).toBe(key);
    });
  });

  it('should return the key if no translation is found', () => {
    TestBed.runInInjectionContext(() => {
      const key = '@unknown_key';
      const pipe = new LocalizePipe();
      const result = pipe.transform(key);
      expect(result).toBe(key);
    });
  });

  it('should return the translated string if found', () => {
    TestBed.runInInjectionContext(() => {
      const key = '@item_name1';
      const pipe = new LocalizePipe();
      const result = pipe.transform(key);
      expect(result).toBe('Item Name 1');
    });
  });

  it('should return the key if no translation with prefix', () => {
    TestBed.runInInjectionContext(() => {
      const key = 'unknown_key';
      const prefix = 'item';
      const pipe = new LocalizePipe();
      const result = pipe.transform(key, prefix);
      expect(result).toBe('unknown_key');
    });
  });

  it('should return the translated string with prefix', () => {
    TestBed.runInInjectionContext(() => {
      const key = 'name1';
      const prefix = 'item';
      const pipe = new LocalizePipe();
      const result = pipe.transform(key, prefix);
      expect(result).toBe('Item Name 1');
    });
  });
});
