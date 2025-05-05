import { firstValueFrom, of, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';

import { NwBuddyApi } from './nw-buddy-api';
import { NwI18n } from './nw-i18n';
import { CollectionCache, ObjectCache } from './object-cache';

interface Item {
  id: string;
  name: string;
}

describe('ObjectCache', () => {
  let cache: ObjectCache<Item>;

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
      TestBed.runInInjectionContext(() => {
        cache = new ObjectCache(of(data), item => item.id);
      });
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

    it('should get values from objects', () => {
      expect(cache.getValue('1', item => item.name)).toEqual('Item 1');
      expect(cache.getValue('2', item => item.name)).toEqual('Item 2');
      expect(cache.getValue('3', item => item.name)).toEqual('Item 3');
      expect(cache.getValue('4', item => item.name)).toEqual('Item 4');
    });

    it('should return null for non-existing keys', () => {
      expect(cache.get('5')).toEqual(null);
      expect(cache.getValue('5', item => item.name)).toEqual(null);
    });
  });

  describe('duplicate keys', () => {
    const data: Record<string, Item[]> = {
      group1: [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }],
      group2: [{ id: '1', name: 'Item 3' }, { id: '4', name: 'Item 4' }]
    }

    beforeEach(() => {
      TestBed.runInInjectionContext(() => {
        cache = new ObjectCache(of(data), obj => obj.id);
      });
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
      TestBed.runInInjectionContext(() => {
        cache = new ObjectCache(of(data), obj => obj.id);
      });
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

  describe('translated data', () => {
    const data: Record<string, Item[]> = {
      group1: [{ id: '1', name: '@item_name1' }, { id: '2', name: '@item_name2' }],
      group2: [{ id: '3', name: 'item_name3' }, { id: '4', name: 'item_name4' }]
    }

    beforeEach(async () => {
      TestBed.runInInjectionContext(() => {
        cache = new ObjectCache(of(data), item => item.id);
      });
      const i18n = TestBed.inject(NwI18n);
      while (i18n.isLoading()) {
        await firstValueFrom(timer(100));
      }
    });

    it('should return source value for missing key', () => {
      expect(cache.getName('@unknown_key', item => item.name)).toEqual(null);
    });

    it('should get translated names', () => {
      expect(cache.getName('1', item => item.name)).toEqual('Item Name 1');
      expect(cache.getName('2', item => item.name)).toEqual('Item Name 2');
    });

    it('should return the origin for non-translated values', () => {
      expect(cache.getName('3', item => item.name)).toEqual('item_name3');
      expect(cache.getName('4', item => item.name)).toEqual('item_name4');
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
      TestBed.runInInjectionContext(() => {
        cache = new CollectionCache(of(data), item => item.id);
      });
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
      TestBed.runInInjectionContext(() => {
        cache = new CollectionCache(of(data), obj => obj.id);
      });
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
});
