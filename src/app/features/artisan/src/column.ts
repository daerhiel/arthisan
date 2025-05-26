import { Pipe, PipeTransform } from '@angular/core';

import { isTableCellContent, isTableCellValue, TableCellContent, TableCellValue, TableColumn } from '@app/core';

@Pipe({
  name: 'column'
})
export class ColumnPipe implements PipeTransform {
  transform<T extends object>(column: TableColumn<T>, source: 'content'): TableCellContent<T>;
  transform<T extends object>(column: TableColumn<T>, source: 'value'): TableCellValue<T>;
  transform<T extends object>(column: TableColumn<T>, source: 'content' | 'value'): TableCellContent<T> | TableCellValue<T> | null {
    const value = column.value;
    if (source === 'content' && isTableCellContent(value)) {
      return value;
    }
    if (source === 'value' && isTableCellValue(value)) {
      return value;
    }
    return null
  }
}
