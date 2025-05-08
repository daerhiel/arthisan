import { getStorageItem, setStorageItem } from './settings'

interface TestObject {
  name?: string;
}

describe('getStorageItem', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return the parsed value', () => {
    const key = 'testKey';
    const value: TestObject = { name: 'test' };
    localStorage.setItem(key, JSON.stringify(value));

    const result = getStorageItem<TestObject>(key, {});

    expect(result).toEqual(value);
  });

  it('should return the fallback for missing value', () => {
    const key = 'nonExistentKey';
    const fallbackValue = { name: 'fallback' };

    const result = getStorageItem(key, fallbackValue);

    expect(result).toEqual(fallbackValue);
  });

  it('should remove the item if parsing fails', () => {
    const key = 'invalidKey';
    localStorage.setItem(key, 'invalidJSON');

    const result = getStorageItem(key, null);

    expect(result).toBeNull();
    expect(localStorage.getItem(key)).toBeNull();
  });
});

describe('setStorageItem', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set the item', () => {
    const key = 'testKey';
    const value: TestObject = { name: 'test' };

    const result = setStorageItem(key, value);

    expect(localStorage.getItem(key)).toEqual(JSON.stringify(value));
    expect(result).toEqual(value);
  });

  it('should remove the item when fails', () => {
    const key = 'invalidKey';
    const value: TestObject = { name: 'test' };
    spyOn(localStorage, 'setItem').and.throwError('Storage error');

    const result = setStorageItem(key, value);

    expect(localStorage.getItem(key)).toBeNull();
    expect(result).toEqual(value);
  });
});
