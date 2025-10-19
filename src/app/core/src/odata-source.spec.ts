import { EventEmitter } from '@angular/core';
import { isDataSource } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { delay, firstValueFrom, of, Subscription, timer } from 'rxjs';

import * as uuid from 'uuid';

import { create, ODataSource } from './odata-source';

export interface Data {
  index: number;
  text: string;
}

export const content: Data[] = [...Array(100).keys()].map(x => ({
  index: x,
  text: uuid.v4()
}));

class TestPaginator {
  pageIndex = 0;

  page = new EventEmitter<PageEvent>();

  constructor(public length: number, public pageSize: number) {
  }

  nextPage(): void {
    const previousPageIndex = this.pageIndex;
    this.pageIndex = Math.min(this.getNumberOfPages() - 1, previousPageIndex + 1);
    const { length, pageIndex, pageSize } = this;
    this.page.emit({ length, pageIndex, pageSize, previousPageIndex });
  }

  previousPage(): void {
    void 0;
  }

  firstPage(): void {
    const previousPageIndex = this.pageIndex;
    this.pageIndex = 0;
    const { length, pageIndex, pageSize } = this;
    this.page.emit({ length, pageIndex, pageSize, previousPageIndex });
  }

  lastPage(): void {
    const previousPageIndex = this.pageIndex;
    this.pageIndex = Math.min(this.getNumberOfPages() - 1, 0);
    const { length, pageIndex, pageSize } = this;
    this.page.emit({ length, pageIndex, pageSize, previousPageIndex });
  }

  hasPreviousPage(): boolean {
    return this.pageIndex > 0;
  }

  hasNextPage(): boolean {
    return this.pageIndex < this.getNumberOfPages();
  }

  getNumberOfPages(): number {
    return Math.ceil(this.length / this.pageSize);
  }
}

const filterContent = <T>(filter: string | null | undefined): (value: T, index: number, array: T[]) => unknown => x => {
  if (filter) {
    for (const name in x) {
      const value = x[name as keyof T];
      if (typeof value === 'string' && value.includes(filter)) {
        return true;
      }
    }
    return false;
  }
  return true;
};

describe('ODataSource', () => {
  const subscriptions: Subscription[] = [];
  let source: ODataSource<Data>;

  beforeEach(() => {
    source = new ODataSource<Data>(query => {
      return of(create(content.filter(filterContent(query.$filter)), query.$top, query.$skip)).pipe(delay(100));
    });
  });

  afterEach(() => {
    while (subscriptions.length > 0) {
      subscriptions.shift()?.unsubscribe();
    }
  });

  it('should create', async () => {
    expect(source).toBeTruthy();
    expect(await firstValueFrom(source.loading$)).toBeFalse();
  });

  it('should detect data source instance', () => {
    expect(isDataSource(source)).toBeTruthy();
  });

  it('should connect to data source', async () => {
    const connection = source.connect();

    expect(connection).toBeTruthy();
  });

  it('should not load on connect', async () => {
    const connection = source.connect();

    expect(connection).toBeTruthy();
    expect(await firstValueFrom(source.loading$)).toBeFalse();
  });

  it('should load on connection subscribe', async () => {
    const connection = source.connect();
    subscriptions.push(connection.subscribe());

    expect(await firstValueFrom(source.loading$)).toBeTrue();
    while (await firstValueFrom(source.loading$)) {
      await (firstValueFrom(timer(100)));
    }
    expect(await firstValueFrom(source.loading$)).toBeFalse();
  });

  it('should get data on connect', async () => {
    const connection = source.connect();
    subscriptions.push(connection.subscribe());

    expect(await firstValueFrom(source.loading$)).toBeTrue();
    while (await firstValueFrom(source.loading$)) {
      await (firstValueFrom(timer(100)));
    }

    expect(await firstValueFrom(connection)).toEqual(content);
  });

  it('should get paginated data on connect', async () => {
    const pageSize = 10;
    source.paginator = new TestPaginator(content.length, pageSize) as MatPaginator;
    const connection = source.connect();
    subscriptions.push(connection.subscribe());

    expect(await firstValueFrom(source.loading$)).toBeTrue();
    await (firstValueFrom(timer(300)));
    while (await firstValueFrom(source.loading$)) {
      await (firstValueFrom(timer(100)));
    }

    const request = firstValueFrom(connection);
    expect(await request).toEqual(content.slice(0, pageSize));
    expect(source.paginator?.length).toEqual(content.length);
  });

  it('should query data', async () => {
    const query = '5';
    source.query = query;
    const connection = source.connect();
    subscriptions.push(connection.subscribe());

    expect(await firstValueFrom(source.loading$)).toBeTrue();
    while (await firstValueFrom(source.loading$)) {
      await (firstValueFrom(timer(100)));
    }

    const request = firstValueFrom(connection);
    const result = content.filter(x => x.text.includes(query));
    expect(await request).toEqual(result);
  });

  it('should query paginated data', async () => {
    const query = '5';
    const pageSize = 10;
    source.query = query;
    source.paginator = new TestPaginator(content.length, pageSize) as MatPaginator;
    const connection = source.connect();
    subscriptions.push(connection.subscribe());

    expect(await firstValueFrom(source.loading$)).toBeTrue();
    while (await firstValueFrom(source.loading$)) {
      await (firstValueFrom(timer(100)));
    }

    const request = firstValueFrom(connection);
    const expected = content.filter(x => x.text.includes(query));
    expect(await request).toEqual(expected.slice(0, pageSize));
    expect(source.paginator?.length).toEqual(expected.length);
  });

  it('should refresh current page', async () => {
    const connection = source.connect();
    subscriptions.push(connection.subscribe());

    expect(await firstValueFrom(source.loading$)).toBeTrue();
    while (await firstValueFrom(source.loading$)) {
      await (firstValueFrom(timer(100)));
    }
    expect(await firstValueFrom(connection)).toEqual(content);

    source.refresh();

    expect(await firstValueFrom(source.loading$)).toBeTrue();
    while (await firstValueFrom(source.loading$)) {
      await (firstValueFrom(timer(100)));
    }
    expect(await firstValueFrom(connection)).toEqual(content);
  })
});
