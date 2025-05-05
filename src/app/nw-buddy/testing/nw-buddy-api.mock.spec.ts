import { NwBuddyApiMock, translationsEn } from "./nw-buddy-api.mock";

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
});
