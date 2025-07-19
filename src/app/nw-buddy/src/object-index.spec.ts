import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';

import { TestBed } from '@angular/core/testing';

import { ObjectCache } from './object-cache';
import { ObjectIndex } from './object-index'

interface Item {
  id: string;
  name: string;
  categories: string[] | string;
}

describe('ObjectIndex', () => {
  let cache: ObjectCache<Item>;
  let index: ObjectIndex<Item>;

  const data: Record<string, Item[]> = {
    group1: [{ id: '1', name: 'Item 1', categories: [] }, { id: '2', name: 'Item 2', categories: ['A'] }],
    group2: [{ id: '3', name: 'Item 3', categories: ['B'] }, { id: '4', name: 'Item 4', categories: ['A', 'B'] }],
    group3: [{ id: '5', name: 'Item 5', categories: 'C' }, { id: '6', name: 'Item 6', categories: 'C' }],
    group4: [{ id: '7', name: 'Item 7', categories: undefined! }, { id: '8', name: 'Item 8', categories: null! }]
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    TestBed.runInInjectionContext(() => {
      cache = new ObjectCache(of(data), item => item.id);
      index = new ObjectIndex(cache, item => item.categories);
    });
    TestBed.flushEffects();
  });

  afterEach(() => {
    index.destroy();
    cache.destroy();
  });

  it('should get keys', () => {
    const keys = Array.from(index.keys()).sort();
    expect(keys).toEqual(['a', 'b', 'c']);
  });

  it('should get items by key', () => {
    const itemsA = index.get('a');
    const itemsB = index.get('b');
    const itemsC = index.get('c');

    expect(itemsA).toEqual([{ id: '2', name: 'Item 2', categories: ['A'] }, { id: '4', name: 'Item 4', categories: ['A', 'B'] }]);
    expect(itemsB).toEqual([{ id: '3', name: 'Item 3', categories: ['B'] }, { id: '4', name: 'Item 4', categories: ['A', 'B'] }]);
    expect(itemsC).toEqual([{ id: '5', name: 'Item 5', categories: 'C' }, { id: '6', name: 'Item 6', categories: 'C' }]);
  });

  it('should return null for unknown key', () => {
    const items = index.get('unknown');
    expect(items).toBeNull();
  });
});
