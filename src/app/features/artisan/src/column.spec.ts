import { Component, provideZonelessChangeDetection } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { TableColumn } from '@app/core';
import { ColumnPipe } from './column';

describe('ContentPipe', () => {
  let pipe: ColumnPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });

    TestBed.runInInjectionContext(() => {
      pipe = new ColumnPipe();
    });
  });

  it('should extract content component', () => {
    const column: TableColumn<{ id: number }, number> = {
      id: 'id',
      displayName: 'Id',
      value: { component: TestComponent, map: x => ({ test: x.id }) }
    };
    const result = pipe.transform(column, 'content');
    expect(result.component).toBeInstanceOf(Function);
  });

  it('should extract value getter', () => {
    const column: TableColumn<{ id: number }, number> = {
      id: 'id',
      displayName: 'Id',
      value: { fit: x => x.id }
    };
    const result = pipe.transform(column, 'value');
    expect(result.fit).toBeInstanceOf(Function);
  });

  it('should return null for invalid source', () => {
    const column: TableColumn<{ id: number }, number> = {
      id: 'id',
      displayName: 'Test',
      value: { fit: x => x.id }
    };
    const result = pipe.transform(column, null!);
    expect(result).toBeNull();
  });
});

@Component({})
class TestComponent {
}
