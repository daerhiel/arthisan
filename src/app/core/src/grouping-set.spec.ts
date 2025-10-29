import { provideZonelessChangeDetection, signal, Signal } from "@angular/core";

import { Grouping, GroupingSet } from "./grouping-set";
import { TestBed } from "@angular/core/testing";

interface Item {
  id: string;
  name: string;
  value: Signal<number>;
}

describe('Grouping', () => {
  const indexer = (item: Item) => item.id;
  const evaluator = (item: Item) => item.value();

  it('should create an instance', () => {
    const grouping = new Grouping<Item>('group1', 'Group 1', indexer, evaluator);
    expect(grouping).toBeTruthy();
  });

  it('should fail on missing id', () => {
    expect(() => new Grouping<Item>(null!, 'Group 1', indexer, evaluator)).toThrowError(/id is required/i);
  });

  it('should fail on missing name', () => {
    expect(() => new Grouping<Item>('group1', null!, indexer, evaluator)).toThrowError(/name is required/i);
  });

  it('should fail on missing indexer', () => {
    expect(() => new Grouping<Item>('group1', 'Group 1', null!, evaluator)).toThrowError(/indexer is required/i);
  });

  it('should fail on missing evaluator', () => {
    expect(() => new Grouping<Item>('group1', 'Group 1', indexer, null!)).toThrowError(/evaluator is required/i);
  });

  const tests = [
    {
      id: 'single item', items: [{ id: '1', name: 'Item 1', value: signal(10) }],
      expected: 10
    },
    {
      id: 'multiple items direct sort', items: [
        { id: '1', name: 'Item 1', value: signal(10) },
        { id: '1', name: 'Item 2', value: signal(20) }
      ],
      expected: 20
    },
    {
      id: 'multiple items reverse sort', items: [
        { id: '1', name: 'Item 1', value: signal(30) },
        { id: '1', name: 'Item 2', value: signal(20) }
      ],
      expected: 30
    }
  ];

  tests.forEach(({ id, items, expected }) => {
    it(`should add ${id}`, () => {
      const grouping = new Grouping<Item>('1', 'Group 1', indexer, evaluator);
      for (const item of items) {
        grouping.add(item);
      }
      expect(grouping.value()).toEqual(expected);
    });
  });

  const failures = [
    {
      id: 'missing item', item: null!,
      error: /invalid item instance/i
    },
    {
      id: 'wrong id', item: { id: '2', name: 'Item 1', value: signal(10) },
      error: /mismatching group/i
    }
  ];

  failures.forEach(({ id, item, error }) => {
    it(`should fail to add ${id}`, () => {
      const grouping = new Grouping<Item>('1', 'Group 1', indexer, evaluator);
      expect(() => grouping.add(item)).toThrowError(error);
    });
  });
});

describe('GroupingSet', () => {
  const indexer = (item: Item) => item.id;
  const translator = (key: string) => `Name for ${key}`;
  const evaluator = (item: Item) => item.value();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
  });

  it('should create an instance', () => {
    const set = TestBed.runInInjectionContext(() =>
      new GroupingSet<Item>(signal([]), indexer, translator, evaluator)
    );
    expect(set).toBeTruthy();
    set.destroy();
  });

  it('should fail on missing items', () => {
    expect(() => TestBed.runInInjectionContext(() =>
      new GroupingSet<Item>(null!, indexer, translator, evaluator)
    )).toThrowError(/invalid items instance/i);
  });

  it('should fail on missing indexer', () => {
    expect(() => TestBed.runInInjectionContext(() =>
      new GroupingSet<Item>(signal([]), null!, translator, evaluator)
    )).toThrowError(/invalid indexer function/i);
  });

  it('should fail on missing translator', () => {
    expect(() => TestBed.runInInjectionContext(() =>
      new GroupingSet<Item>(signal([]), indexer, null!, evaluator)
    )).toThrowError(/invalid translator function/i);
  });

  it('should fail on missing evaluator', () => {
    expect(() => TestBed.runInInjectionContext(() =>
      new GroupingSet<Item>(signal([]), indexer, translator, null!)
    )).toThrowError(/invalid evaluator function/i);
  });

  it('should have empty groups initially', () => {
    const set = TestBed.runInInjectionContext(() =>
      new GroupingSet<Item>(signal([]), indexer, translator, evaluator)
    );
    expect(set.groups()).toEqual([]);
    set.destroy();
  });

  it('should create groups from items', () => {
    const items = signal<Item[]>([
      { id: '1', name: 'Item 1', value: signal(10) },
      { id: '2', name: 'Item 2', value: signal(30) },
      { id: '1', name: 'Item 3', value: signal(20) }
    ]);
    const set = TestBed.runInInjectionContext(() =>
      new GroupingSet<Item>(items, indexer, translator, evaluator)
    );
    TestBed.tick();

    const groups = set.groups();
    expect(groups.map(group => group.id)).toEqual(['2', '1']);
    set.destroy();
  });

  it('should update groups on items change', () => {
    const items = signal<Item[]>([
      { id: '1', name: 'Item 1', value: signal(10) },
      { id: '2', name: 'Item 2', value: signal(20) }
    ]);
    const set = TestBed.runInInjectionContext(() =>
      new GroupingSet<Item>(items, indexer, translator, evaluator)
    );
    TestBed.tick();

    items.set([
      { id: '1', name: 'Item 1', value: signal(10) },
      { id: '2', name: 'Item 2', value: signal(30) },
      { id: '1', name: 'Item 3', value: signal(20) }
    ]);
    TestBed.tick();

    const groups = set.groups();
    expect(groups.map(group => group.id)).toEqual(['2', '1']);
    set.destroy();
  });

  it('should update groups on item value change', () => {
    const item1 = { id: '1', name: 'Item 1', value: signal(10) };
    const item2 = { id: '2', name: 'Item 2', value: signal(20) };
    const items = signal<Item[]>([item1, item2]);
    const set = TestBed.runInInjectionContext(() =>
      new GroupingSet<Item>(items, indexer, translator, evaluator)
    );
    TestBed.tick();

    item2.value.set(30);
    TestBed.tick();

    const groups = set.groups();
    expect(groups.map(group => group.id)).toEqual(['2', '1']);
    set.destroy();
  });

  it('should get grouping by id', () => {
    const items = signal<Item[]>([
      { id: '1', name: 'Item 1', value: signal(10) },
      { id: '2', name: 'Item 2', value: signal(20) }
    ]);
    const set = TestBed.runInInjectionContext(() =>
      new GroupingSet<Item>(items, indexer, translator, evaluator)
    );
    TestBed.tick();

    const group = set.get('2');
    expect(group).toBeTruthy();
    expect(group?.name).toBe('Name for 2');
    set.destroy();
  });
});
