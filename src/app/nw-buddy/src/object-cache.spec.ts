import { of } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';

import { NwBuddyApi } from './nw-buddy-api';
import { ArrayCache, CollectionCache, ObjectCache } from './object-cache';

interface Item {
  id: string;
  name: string;
}

interface Rank {
  id: number;
  name: string;
}

describe('ObjectCache', () => {
  let cache: ObjectCache<Item>;

  beforeEach(() => {
    spyOn(console, 'warn');
  });

  describe('regular data', () => {
    const data: Record<string, Item[]> = {
      group1: [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }],
      group2: [{ id: '3', name: 'Item 3' }, { id: '4', name: 'Item 4' }]
    }

    beforeEach(() => {
      cache = new ObjectCache(of(data), item => item.id);
    });

    afterEach(() => {
      cache.destroy();
    });

    it('should create an instance', () => {
      expect(cache).toBeTruthy();
    });

    it('should detect the present keys', () => {
      expect(cache.has('1')).toBe(true);
      expect(cache.has('2')).toBe(true);
      expect(cache.has('3')).toBe(true);
      expect(cache.has('4')).toBe(true);
    });

    it('should not detect the absent keys', () => {
      expect(cache.has('5')).toBe(false);
      expect(cache.has('6')).toBe(false);
    });

    it('should get keys', () => {
      const keys = Array.from(cache.keys()).sort();
      expect(keys).toEqual(['1', '2', '3', '4']);
    });

    it('should return the correct values', () => {
      expect(cache.get('1')).toEqual({ id: '1', name: 'Item 1' });
      expect(cache.get('2')).toEqual({ id: '2', name: 'Item 2' });
      expect(cache.get('3')).toEqual({ id: '3', name: 'Item 3' });
      expect(cache.get('4')).toEqual({ id: '4', name: 'Item 4' });
    });
  });

  describe('duplicate keys', () => {
    const data: Record<string, Item[]> = {
      group1: [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }],
      group2: [{ id: '1', name: 'Item 3' }, { id: '4', name: 'Item 4' }]
    }

    beforeEach(() => {
      cache = new ObjectCache(of(data), obj => obj.id);
    });

    afterEach(() => {
      cache.destroy();
    });

    it('should create an instance', () => {
      expect(cache).toBeTruthy();
    });

    it('should get keys', () => {
      const keys = Array.from(cache.keys()).sort();
      expect(keys).toEqual(['1', '2', '4']);
    });

    it('should return the correct values', () => {
      expect(cache.get('1')).toEqual({ id: '1', name: 'Item 1' });
      expect(cache.get('2')).toEqual({ id: '2', name: 'Item 2' });
      expect(cache.get('3')).toEqual(null);
      expect(cache.get('4')).toEqual({ id: '4', name: 'Item 4' });
    });
  });

  describe('undefined keys', () => {
    const data: Record<string, Item[]> = {
      group1: [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }],
      group2: [{ id: undefined!, name: 'Item 3' }, { id: '4', name: 'Item 4' }]
    }

    beforeEach(() => {
      cache = new ObjectCache(of(data), obj => obj.id);
    });

    afterEach(() => {
      cache.destroy();
    });

    it('should create an instance', () => {
      expect(cache).toBeTruthy();
    });

    it('should get keys', () => {
      const keys = Array.from(cache.keys()).sort();
      expect(keys).toEqual(['1', '2', '4']);
    });

    it('should return the correct values', () => {
      expect(cache.get('1')).toEqual({ id: '1', name: 'Item 1' });
      expect(cache.get('2')).toEqual({ id: '2', name: 'Item 2' });
      expect(cache.get(undefined!)).toEqual(null);
      expect(cache.get('4')).toEqual({ id: '4', name: 'Item 4' });
    });
  });
});

describe('CollectionCache', () => {
  let cache: CollectionCache<Item>;

  beforeEach(() => {
    spyOn(console, 'warn');
    TestBed.configureTestingModule({
      providers: [
        { provide: NwBuddyApi, useClass: NwBuddyApiMock }
      ]
    });
  });

  describe('regular data', () => {
    const data: Record<string, Item[]> = {
      group1: [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }],
      group2: [{ id: '3', name: 'Item 3' }, { id: '4', name: 'Item 4' }]
    }

    beforeEach(() => {
      cache = new CollectionCache(of(data), item => item.id);
    });

    afterEach(() => {
      cache.destroy();
    });

    it('should create an instance', () => {
      expect(cache).toBeTruthy();
    });

    it('should detect the present keys', () => {
      expect(cache.has('1')).toBe(true);
      expect(cache.has('2')).toBe(true);
      expect(cache.has('3')).toBe(true);
      expect(cache.has('4')).toBe(true);
    });

    it('should not detect the absent keys', () => {
      expect(cache.has('5')).toBe(false);
      expect(cache.has('6')).toBe(false);
    });

    it('should get keys', () => {
      const keys = Array.from(cache.keys()).sort();
      expect(keys).toEqual(['1', '2', '3', '4']);
    });

    it('should return the correct values', () => {
      expect(cache.get('1')).toEqual([{ id: '1', name: 'Item 1' }]);
      expect(cache.get('2')).toEqual([{ id: '2', name: 'Item 2' }]);
      expect(cache.get('3')).toEqual([{ id: '3', name: 'Item 3' }]);
      expect(cache.get('4')).toEqual([{ id: '4', name: 'Item 4' }]);
    });
  });

  describe('duplicate keys', () => {
    const data: Record<string, Item[]> = {
      group1: [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }],
      group2: [{ id: '1', name: 'Item 3' }, { id: '4', name: 'Item 4' }]
    }

    beforeEach(() => {
      cache = new CollectionCache(of(data), obj => obj.id);
    });

    afterEach(() => {
      cache.destroy();
    });

    it('should create an instance', () => {
      expect(cache).toBeTruthy();
    });

    it('should get keys', () => {
      const keys = Array.from(cache.keys()).sort();
      expect(keys).toEqual(['1', '2', '4']);
    });

    it('should return the correct values', () => {
      expect(cache.get('1')).toEqual([{ id: '1', name: 'Item 1' }, { id: '1', name: 'Item 3' }]);
      expect(cache.get('2')).toEqual([{ id: '2', name: 'Item 2' }]);
      expect(cache.get('3')).toEqual(null);
      expect(cache.get('4')).toEqual([{ id: '4', name: 'Item 4' }]);
    });
  });

  describe('undefined keys', () => {
    const data: Record<string, Item[]> = {
      group1: [{ id: '1', name: 'Item 1' }, { id: '1', name: 'Item 2' }],
      group2: [{ id: undefined!, name: 'Item 3' }, { id: '4', name: 'Item 4' }]
    }

    beforeEach(() => {
      cache = new CollectionCache(of(data), obj => obj.id);
    });

    afterEach(() => {
      cache.destroy();
    });

    it('should create an instance', () => {
      expect(cache).toBeTruthy();
    });

    it('should get keys', () => {
      const keys = Array.from(cache.keys()).sort();
      expect(keys).toEqual(['1', '4']);
    });

    it('should return the correct values', () => {
      expect(cache.get('1')).toEqual([{ id: '1', name: 'Item 1' }, { id: '1', name: 'Item 2' }]);
      expect(cache.get(undefined!)).toEqual(null);
      expect(cache.get('4')).toEqual([{ id: '4', name: 'Item 4' }]);
    });
  });
});

describe('ArrayCache', () => {
  let cache: ArrayCache<Rank>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NwBuddyApi, useClass: NwBuddyApiMock }
      ]
    });
  });

  describe('regular data', () => {
    const data: Rank[] = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ];

    beforeEach(() => {
      cache = new ArrayCache(of(data), item => item.id);
    });

    afterEach(() => {
      cache.destroy();
    });

    it('should create an instance', () => {
      expect(cache).toBeTruthy();
    });

    it('should get allocated items', () => {
      expect(cache.get(1)).toEqual({ id: 1, name: 'Item 1' });
      expect(cache.get(2)).toEqual({ id: 2, name: 'Item 2' });
      expect(cache.get(3)).toEqual({ id: 3, name: 'Item 3' });
    });
  });

  describe ('missing data', () => {
    const data: Rank[] = null!;

    beforeEach(() => {
      cache = new ArrayCache(of(data), item => item.id);
    });

    afterEach(() => {
      cache.destroy();
    });

    it('should create an instance', () => {
      expect(cache).toBeTruthy();
    });

    it('should not get any items', () => {
      expect(cache.get(1)).toBe(null);
      expect(cache.get(2)).toBe(null);
      expect(cache.get(3)).toBe(null);
    });
  });
});
