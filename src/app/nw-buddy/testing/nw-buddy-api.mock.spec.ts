import { firstValueFrom, tap } from 'rxjs';

import { NwBuddyApiMock, getIconPath, translationsEn } from './nw-buddy-api.mock';

describe('getIconPath', () => {
  it('should get resource icon path', () => {
    const iconPath = getIconPath('Resource', 'OreT1');
    expect(iconPath).toBe('lyshineui/images/icons/items/resource/oret1.webp');
  });

  it('should get housing item icon path', () => {
    const iconPath = getIconPath('HousingItem', 'HousingItem_Lighting_CandleHolder_A');
    expect(iconPath).toBe('lyshineui/images/icons/items/housingitem/housingitem_lighting_candleholder_a.webp');
  });
});

describe('NwBuddyApiMock', () => {
  let service: NwBuddyApiMock;

  beforeEach(() => {
    service = new NwBuddyApiMock();
  });

  it('should get translations', async () => {
    expect(await firstValueFrom(service.getTranslations('en-us'))).toEqual(translationsEn);
  });

  it('should get empty translations for unknown locale', async () => {
    expect(await firstValueFrom(service.getTranslations('unknown-locale'))).toEqual({});
  });

  it('should get translations without deferring', async () => {
    let translations: Record<string, string> | undefined;
    const stream = firstValueFrom(service.getTranslations('en-us').pipe(tap(x => translations = x)));
    expect(translations).toBe(translationsEn);
    expect(await stream).toEqual(translationsEn);
  });

  it('should get complete deferred translations', async () => {
    service.defer(true);

    let translations: Record<string, string> | undefined;
    const stream = firstValueFrom(service.getTranslations('en-us').pipe(tap(x => translations = x)));
    expect(translations).toBeUndefined();

    service.complete('en-us');
    expect(translations).toEqual(translationsEn);

    expect(await stream).toEqual(translationsEn);
  });

  it('should complete all on deferred translations', async () => {
    service.defer(true);

    let translations1: Record<string, string> | undefined;
    let translations2: Record<string, string> | undefined;
    const stream1 = firstValueFrom(service.getTranslations('en-us').pipe(tap(x => translations1 = x)));
    const stream2 = firstValueFrom(service.getTranslations('unknown').pipe(tap(x => translations2 = x)));
    expect(translations1).toBeUndefined();
    expect(translations2).toBeUndefined();

    service.completeAll();
    expect(translations1).toEqual(translationsEn);
    expect(translations2).toEqual({});

    expect(await stream1).toEqual(translationsEn);
    expect(await stream2).toEqual({});
  });
});
