import { ObjectMap } from "./object-map";

describe('ObjectMap', () => {
  let cache: ObjectMap<number>;

  beforeEach(() => {
    cache = new ObjectMap<number>();
  });

  it('should set and get values correctly', () => {
    cache.set('Key1', 1);
    expect(cache.get('Key1')).toBe(1);
    expect(cache.get('key1')).toBe(1);
  });

  it('should check for existence of keys correctly', () => {
    cache.set('Key1', 1);
    expect(cache.has('Key1')).toBe(true);
    expect(cache.has('key1')).toBe(true);
    expect(cache.has('Key2')).toBe(false);
  });

  it('should delete keys correctly', () => {
    cache.set('Key1', 1);
    expect(cache.delete('Key1')).toBe(true);
    expect(cache.has('Key1')).toBe(false);
    expect(cache.delete('Key2')).toBe(false);
  });

  it('should return the correct size', () => {
    expect(cache.size).toBe(0);
    cache.set('Key1', 1);
    expect(cache.size).toBe(1);
    cache.set('Key2', 2);
    expect(cache.size).toBe(2);
    cache.delete('Key1');
    expect(cache.size).toBe(1);
  });
});
