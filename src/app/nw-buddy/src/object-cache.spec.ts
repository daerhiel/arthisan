import { of } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';

import { NwBuddyApi } from './nw-buddy-api';
import { CollectionCache, ObjectCache } from './object-cache';

interface Item {
  id: string;
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

    it('should create an instance', () => {
      expect(cache).toBeTruthy();
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

    it('should create an instance', () => {
      expect(cache).toBeTruthy();
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
