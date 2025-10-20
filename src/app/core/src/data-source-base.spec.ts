import { EventEmitter } from '@angular/core';
import { Sort, SortDirection } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

import { PaginatorSource, SorterSource, deepComparator } from './data-source-base';

export interface Data {
  name: string;
  value: number | null;
}

export class TestPaginator implements PaginatorSource {
  readonly page = new EventEmitter<PageEvent>();

  pageIndex = 0;

  constructor(readonly length: number, readonly pageSize: number) {
  }

  getPageCount(): number {
    return Math.ceil(this.length / this.pageSize);
  }

  setPage(pageIndex: number) {
    this.pageIndex = Math.max(pageIndex, 0, Math.min(pageIndex, this.getPageCount() - 1));
    const { pageSize, length } = this;
    this.page.emit({ pageIndex, pageSize, length });
  }

  firstPage(): void {
    this.pageIndex = 0;
    const { pageIndex, pageSize, length } = this;
    this.page.emit({ pageIndex, pageSize, length });
  }

  lastPage(): void {
    this.pageIndex = Math.max(this.getPageCount() - 1, 0);
    const { pageIndex, pageSize, length } = this;
    this.page.emit({ pageIndex, pageSize, length });
  }
}

export class TestSorter implements SorterSource {
  readonly sortChange = new EventEmitter<Sort>();
  active: string;
  direction: SortDirection;

  constructor(active: string, direction: SortDirection) {
    this.active = active;
    this.direction = direction;
  }

  sortData(active: string, direction: SortDirection): void {
    this.active = active;
    this.direction = direction;
    this.sortChange.emit({ active, direction });
  }
}

export const data: Data[] = [
  { name: 'First 4', value: null },
  { name: 'First 2', value: 2 },
  { name: 'First 3', value: 3 },
  { name: 'First 6', value: 6 },
  { name: 'First 7', value: 7 },
  { name: 'First 5', value: 5 },
  { name: 'First 1', value: 1 },
  { name: 'First 10', value: 10 },
  { name: 'First 8', value: 8 },
  { name: 'First 9', value: 9 },
  { name: 'Middle 11', value: 11 },
  { name: 'Middle 12', value: 12 },
  { name: 'Middle 14', value: 14 },
  { name: 'Middle 13', value: 13 },
  { name: 'Middle 15', value: 15 },
  { name: 'Middle 18', value: 18 },
  { name: 'Middle 16', value: 16 },
  { name: 'Middle 17', value: 17 },
  { name: 'Middle 19', value: 19 },
  { name: 'Middle 20', value: null },
  { name: 'Last 21', value: 21 },
  { name: 'Last 25', value: 25 },
  { name: 'Last 23', value: 23 },
  { name: 'Last 26', value: 26 },
  { name: 'Last 30', value: null },
  { name: 'Last 28', value: 28 },
  { name: 'Last 22', value: 22 },
  { name: 'Last 27', value: 27 },
  { name: 'Last 24', value: 24 },
  { name: 'Last 29', value: 29 }
];

export function sliceData<T>(data: T[], page?: number | null, size?: number | null): T[] {
  if (size) {
    const start = (page ?? 0) * size;
    return data.slice(start, start + size);
  }
  return data;
}

export function filterData<T>(data: T[], filter?: string | null): T[] {
  if (filter) {
    data = data.filter(x => {
      if (x && typeof x === 'object') {
        return Object.keys(x).some(p => `${x[p as keyof typeof x]}`.toLowerCase().includes(filter.toLowerCase()));
      } else {
        return `${x}`.toLowerCase().includes(filter.toLowerCase());
      }
    });
  }
  return data;
}

export function sortData<T>(data: T[], active?: string | null, direction?: SortDirection | null): T[] {
  if (active && direction) {
    const path = active.split(/[./]/).map(x => x.trim());

    data = data.sort((a, b) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let valueA = path.reduce<any>((x, name) => x && x[name], a);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let valueB = path.reduce<any>((x, name) => x && x[name], b);

      const valueAType = typeof valueA;
      const valueBType = typeof valueB;

      if (valueAType !== valueBType) {
        if (valueAType === 'number') {
          valueA += '';
        }
        if (valueBType === 'number') {
          valueB += '';
        }
      }

      let result = 0;
      if (valueA > valueB) {
        result = 1;
      } else if (valueA < valueB) {
        result = -1;
      }

      return result * (direction === 'asc' ? 1 : -1);
    });
  }
  return data;
}

export interface QueryBlock<T> {
  query: string;
  data: T[];
}

export function getFilteredData<T>(data: T[], ...queries: string[]): QueryBlock<T>[] {
  const result: QueryBlock<T>[] = [];
  for (const query of queries) {
    result.push({ query, data: filterData(data, query) });
  }
  return result;
}

export interface SliceBlock<T> {
  page: number;
  size: number;
  data: T[];
}

export function getSlicedData<T>(data: T[], size: number): SliceBlock<T>[] {
  const count = Math.max(Math.ceil(data.length / size), 0);
  const result: SliceBlock<T>[] = [];
  for (let page = 0; page < count; page++) {
    result.push({ page, size, data: sliceData(data, page, size) });
  }
  return result;
}

export interface SortingData {
  active: string;
  direction: SortDirection;
}

export type SortingBlock<T> = SortingData & {
  active: string;
  direction: SortDirection;
  data: T[];
};

export function getSortedData<T>(data: T[], ...sorts: SortingData[]): SortingBlock<T>[] {
  const result: SortingBlock<T>[] = [];
  for (const { active, direction } of sorts) {
    result.push({ active, direction, data: sortData([...data], active, direction) });
  }
  return result;
}

describe('deepComparator', () => {
  const tests = [
    { name: 'undefined values', x: undefined, y: undefined, result: true },
    { name: 'null values', x: null, y: null, result: true },
    { name: 'null and undefined', x: null, y: undefined, result: false },
    { name: 'same booleans', x: true, y: true, result: true },
    { name: 'different booleans', x: true, y: false, result: false },
    { name: 'same numbers', x: 42, y: 42, result: true },
    { name: 'different numbers', x: 42, y: '42', result: false },
    { name: 'same strings', x: 'test', y: 'test', result: true },
    { name: 'different strings', x: 'test1', y: 'test2', result: false },
    { name: 'same date objects', x: new Date('2023-01-01'), y: new Date('2023-01-01'), result: true },
    { name: 'different date objects', x: new Date('2023-01-01'), y: new Date('2023-01-02'), result: false },
    { name: 'objects with same properties', x: { a: 1, b: 2 }, y: { a: 1, b: 2 }, result: true },
    { name: 'objects with different properties', x: { a: 1, b: 2 }, y: { a: 1, b: 3 }, result: false },
    { name: 'nested objects with same properties', x: { a: { b: 2 } }, y: { a: { b: 2 } }, result: true },
    { name: 'nested objects with different properties', x: { a: { b: 2 } }, y: { a: { b: 3 } }, result: false },
    { name: 'arrays with same elements', x: [1, 2, 3], y: [1, 2, 3], result: true },
    { name: 'arrays with different elements', x: [1, 2, 3], y: [1, 2, 4], result: false },
    { name: 'arrays with different lengths left', x: [1, 2], y: [1, 2, 3], result: false },
    { name: 'arrays with different lengths right', x: [1, 2, 3], y: [1, 2], result: false },
    { name: 'empty objects', x: {}, y: {}, result: true },
    { name: 'empty arrays', x: [], y: [], result: true },
    { name: 'empty object and array', x: {}, y: [], result: true }
  ];

  tests.forEach(({ name, x, y, result }) => {
    it(`should compare ${name}`, () => {
      expect(deepComparator(x, y)).toBe(result);
    });
  });
});
