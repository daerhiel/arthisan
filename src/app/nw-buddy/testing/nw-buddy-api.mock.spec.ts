import { firstValueFrom } from "rxjs";

import { NwBuddyApiMock, getIconPath, translationsEn } from "./nw-buddy-api.mock";

describe('getIconPath', () => {
  it('should get icon path', () => {
    const iconPath = getIconPath('OreT1');
    expect(iconPath).toBe('lyshineui/images/icons/items/resource/oret1.webp');
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
});
