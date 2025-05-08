import { TestBed } from '@angular/core/testing';

import { TableColumn } from '@app/core';
import { ColumnPipe } from './column';

describe('ContentPipe', () => {
  let pipe: ColumnPipe;

  beforeEach(() => {
    TestBed.runInInjectionContext(() => {
      pipe = new ColumnPipe();
    });
  });

  it('should extract content component', () => {
    const column: TableColumn<{ id: number }> = {
      id: 'id',
      displayName: 'Id',
      value: {
        component: class TestComponent {},
        inputs: (x) => ({ test: x.id }),
      }
    };
    const result = pipe.transform(column, 'content');
    expect(result.component).toBeInstanceOf(Function);
  });

  it('should extract value getter', () => {
    const column: TableColumn<{ id: number }> = {
      id: 'id',
      displayName: 'Id',
      value: {
        get: (x) => x.id,
      }
    };
    const result = pipe.transform(column, 'value');
    expect(result.get).toBeInstanceOf(Function);
  });

  it('should return null for invalid source', () => {
    const column: TableColumn<{ id: number }> = {
      id: 'id',
      displayName: 'Test',
      value: {
        get: (x) => x.id,
      }
    };
    const result = pipe.transform(column, null!);
    expect(result).toBeNull();
  });
});
