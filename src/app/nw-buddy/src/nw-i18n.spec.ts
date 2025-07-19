import { provideZonelessChangeDetection } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';

import { NwI18n } from './nw-i18n';
import { NwBuddyApi } from './nw-buddy-api';

describe('NwI18n', () => {
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

  it('should create an instance', () => {
    expect(i18n).toBeTruthy();
  });

  it('should return the value for missing key', () => {
    const key = '';
    const result = i18n.get(key);
    expect(result).toBe(key);
  });

  it('should return the value for non-key', () => {
    const key = 'item_name1';
    const result = i18n.get(key);
    expect(result).toBe(key);
  });

  it('should return the key if no translation is found', () => {
    const key = '@unknown_key';
    const result = i18n.get(key);
    expect(result).toBe(key);
  });

  it('should return the translated string if found', () => {
    const key = '@item_name1';
    const result = i18n.get(key);
    expect(result).toBe('Item Name 1');
  });

  it('should return the key if no translation with prefix', () => {
    const key = 'unknown_key';
    const prefix = 'item';
    const result = i18n.get(key, prefix);
    expect(result).toBe('unknown_key');
  });

  it('should return the translated string with prefix', () => {
    const key = 'name1';
    const prefix = 'item';
    const result = i18n.get(key, prefix);
    expect(result).toBe('Item Name 1');
  });
});
