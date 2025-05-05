import { signal } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { TableDefinition } from './models/tables';
import { ColumnsPipe } from './columns';

describe('ColumnsPipe', () => {
  let pipe: ColumnsPipe;

  beforeEach(() => {
    TestBed.runInInjectionContext(() => {
      pipe = new ColumnsPipe();
    });
  });

  it('create an instance', () => {
    const pipe = new ColumnsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should extract column ids from table definition', () => {
    const table: TableDefinition<{ id: number, name: string }> = {
      name: 'Test Table',
      columns: [
        { id: 'id', displayName: 'Id', value: { get: (x) => x.id } },
        { id: 'name', displayName: 'Name', value: { get: (x) => x.name } }
      ],
      data: signal([])
    };
    const result = pipe.transform(table);
    expect(result).toEqual(['id', 'name']);
  });
});
