import { provideZonelessChangeDetection } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';

import { NwI18n } from './nw-i18n';
import { NwBuddyApi } from './nw-buddy-api';
import { LocalizePipe } from './localize-pipe';

describe('LocalizePipe', () => {
  let i18n: NwI18n;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: NwBuddyApi, useClass: NwBuddyApiMock }
      ]
    });

    i18n = TestBed.inject(NwI18n);
    while (i18n.isLoading()) {
      await firstValueFrom(timer(100));
    }
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
