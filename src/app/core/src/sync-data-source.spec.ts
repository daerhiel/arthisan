import { Subscription, firstValueFrom } from 'rxjs';

import {
  getFilteredData, getSlicedData, getSortedData, TestPaginator, TestSorter,
  filterData, sliceData, sortData, Data, data
} from './data-source-base.spec';

import { SyncDataSource } from './sync-data-source';

describe('SyncDataSource', () => {
  const subscriptions: Subscription[] = [];

  let dataSource: SyncDataSource<Data>;

  beforeEach(() => {
    dataSource = new SyncDataSource<Data>([...data.map(x => ({ ...x }))]);
  });

  afterEach(() => {
    while (subscriptions.length > 0) {
      subscriptions.shift()?.unsubscribe();
    }
  });

  it('should create an instance', () => {
    expect(dataSource).toBeTruthy();
  });

  it('should connect to data source', () => {
    const connection = dataSource.connect();
    expect(connection).toBeTruthy();
  });

  it('should disconnect from data source', () => {
    expect(() => dataSource.disconnect()).not.toThrow();
  });

  it('should get data on connect to data source', async () => {
    const connection = dataSource.connect();
    subscriptions.push(connection.subscribe());
    expect(await firstValueFrom(connection)).toEqual(data);
  });

  it('should set data on connect to data source', async () => {
    const connection = dataSource.connect();
    subscriptions.push(connection.subscribe());
    expect(dataSource.data).toEqual(await firstValueFrom(connection));
  });

  it('should paginate by paginator attached', async () => {
    const pageSize = 5;
    const connection = dataSource.connect();
    dataSource.paginator = new TestPaginator(data.length, pageSize);
    subscriptions.push(connection.subscribe());
    expect(await firstValueFrom(connection)).toEqual(sliceData(data, 0, pageSize));
  });

  getSlicedData(data, 7).forEach(block => {
    it(`should get paginated data for page ${block.page} and size ${block.size}`, async () => {
      const pageSize = block.size;
      const connection = dataSource.connect();
      const paginator = new TestPaginator(data.length, pageSize);
      dataSource.paginator = paginator;

      subscriptions.push(connection.subscribe());
      paginator.setPage(block.page);
      expect(await firstValueFrom(connection)).toEqual(block.data);
    });
  });

  getSlicedData(data, 10).forEach(block => {
    it(`should get paginated data for page ${block.page} and size ${block.size}`, async () => {
      const pageSize = block.size;
      const connection = dataSource.connect();
      const paginator = new TestPaginator(data.length, pageSize);
      dataSource.paginator = paginator;

      subscriptions.push(connection.subscribe());
      paginator.setPage(block.page);
      expect(await firstValueFrom(connection)).toEqual(block.data);
    });
  });

  getSlicedData(data, 20).forEach(block => {
    it(`should get paginated data for page ${block.page} and size ${block.size}`, async () => {
      const pageSize = block.size;
      const connection = dataSource.connect();
      const paginator = new TestPaginator(data.length, pageSize);
      dataSource.paginator = paginator;

      subscriptions.push(connection.subscribe());
      paginator.setPage(block.page);
      expect(await firstValueFrom(connection)).toEqual(block.data);
    });
  });

  it('should get data on paginator clear', async () => {
    const pageSize = 5;
    const connection = dataSource.connect();
    dataSource.paginator = new TestPaginator(data.length, pageSize);
    dataSource.paginator = null;

    subscriptions.push(connection.subscribe());
    expect(await firstValueFrom(connection)).toEqual(data);
  });

  it('should update paginator last page on data change', async () => {
    const pageSize = 5;
    const connection = dataSource.connect();
    dataSource.paginator = new TestPaginator(data.length, pageSize);

    subscriptions.push(connection.subscribe());
    dataSource.paginator.lastPage();
    dataSource.data = filterData(data, 'first');
    expect(await firstValueFrom(connection)).toEqual(
      sliceData(filterData(data, 'first'), 1, 5)
    );
  });

  it('should set query value', async () => {
    dataSource.query = 'first';
    expect(dataSource.query).toBe('first');
  });

  getFilteredData(data, 'first', 'middle', 'last').forEach(({ query, data }) => {
    it(`should get filtered data for clause ${query}`, async () => {
      const connection = dataSource.connect();
      dataSource.query = query;

      subscriptions.push(connection.subscribe());
      expect(await firstValueFrom(connection)).toEqual(data);
    });
  });

  it('should reset page on query change', async () => {
    const pageSize = 5;
    const connection = dataSource.connect();
    dataSource.paginator = new TestPaginator(data.length, pageSize);

    subscriptions.push(connection.subscribe());
    dataSource.paginator.lastPage();
    dataSource.query = 'first';
    expect(await firstValueFrom(connection)).toEqual(
      sliceData(filterData(data, 'first'), 0, pageSize)
    );
  });

  it('should get data on filter clear', async () => {
    const connection = dataSource.connect();
    dataSource.query = 'first';
    dataSource.query = null;

    subscriptions.push(connection.subscribe());
    expect(await firstValueFrom(connection)).toEqual(data);
  });

  it('should filter data with custom predicate', async () => {
    const builder = () => (x: Data) => !!x.value && x.value > 5;
    dataSource = new SyncDataSource<Data>([...data.map(x => ({ ...x }))]);
    dataSource.predicate = builder;
    const connection = dataSource.connect();
    dataSource.query = 'first';
    dataSource.filters = {};

    subscriptions.push(connection.subscribe());
    expect(await firstValueFrom(connection)).toEqual(
      filterData(data, 'first').filter(builder())
    );
  });

  it('should refresh when custom predicate condition changes', async () => {
    let condition = 10;
    const builder = () => (x: Data) => !!x.value && x.value > condition;
    dataSource = new SyncDataSource<Data>([...data.map(x => ({ ...x }))]);
    dataSource.predicate = builder;
    const connection = dataSource.connect();
    dataSource.query = 'first';
    dataSource.filters = {};

    subscriptions.push(connection.subscribe());
    condition = 1;
    dataSource.refresh();
    expect(await firstValueFrom(connection)).toEqual(
      filterData(data, 'first').filter(builder())
    );
  });

  const sortCases = [
    { active: 'name', direction: null! },
    { active: 'name', direction: 'asc' },
    { active: 'name', direction: 'desc' },
    { active: 'value', direction: null! },
    { active: 'value', direction: 'asc' },
    { active: 'value', direction: 'desc' }
  ] as const;

  it('should sort by sorter attached', async () => {
    const connection = dataSource.connect();
    dataSource.sort = new TestSorter('name', 'asc');
    subscriptions.push(connection.subscribe());
    expect(await firstValueFrom(connection)).toEqual(
      sortData([...data], 'name', 'asc')
    );
  });

  getSortedData(data, ...sortCases).forEach(block => {
    it(`should sort data on '${block.active}' to '${block.direction ?? 'origin'}`, async () => {
      const connection = dataSource.connect();
      dataSource.sort = new TestSorter(block.active, block.direction);

      subscriptions.push(connection.subscribe());
      expect(await firstValueFrom(connection)).toEqual(block.data);
    });
  });

  it('should get data on sorter clear', async () => {
    const connection = dataSource.connect();
    dataSource.sort = new TestSorter('name', 'asc');
    dataSource.sort = null;

    subscriptions.push(connection.subscribe());
    expect(await firstValueFrom(connection)).toEqual(data);
  });

  it('should get sort data on update', async () => {
    const connection = dataSource.connect();
    const sort = new TestSorter('name', 'asc');
    dataSource.sort = sort;

    subscriptions.push(connection.subscribe());
    sort.sortData('value', 'desc');
    expect(await firstValueFrom(connection)).toEqual(
      sortData([...data], 'value', 'desc')
    );
  });
});
