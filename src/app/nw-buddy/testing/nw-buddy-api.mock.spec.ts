import { NwBuddyApiMock } from "./nw-buddy-api.mock";

describe('NwBuddyApiMock', () => {
  let service: NwBuddyApiMock;

  beforeEach(() => {
    service = new NwBuddyApiMock();
  });

  it('should get translations', () => {
    service.getTranslations().subscribe((localization) => {
      expect(localization).toEqual({});
    });
  });
});
