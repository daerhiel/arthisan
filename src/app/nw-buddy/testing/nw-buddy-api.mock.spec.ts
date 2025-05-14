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

  it('should get translations', () => {
    service.getTranslations('en-us').subscribe((localization) => {
      expect(localization).toEqual(translationsEn);
    });
  });

  it('should get empty translations for unknown locale', () => {
    service.getTranslations('unknown-locale').subscribe((localization) => {
      expect(localization).toEqual({});
    });
  });
});
