import { Pipe, PipeTransform } from '@angular/core';

import { TableCellContent, TableCellValue, TableColumn } from './models/tables';

@Pipe({
  name: 'column'
})
export class ColumnPipe implements PipeTransform {
  transform<T>(column: TableColumn<T>, source: 'content'): TableCellContent<T>;
  transform<T>(column: TableColumn<T>, source: 'value'): TableCellValue<T>;
  transform<T>(column: TableColumn<T>, source: 'content' | 'value'): TableCellContent<T> | TableCellValue<T> | null {
    const value = column.value;
    if (source === 'content' && value && typeof value === 'object' && 'component' in value) {
      return value;
    }
    if (source === 'value' && value && typeof value === 'object' && 'get' in value) {
      return value;
    }
    return null
  }
}
