import { Pipe, PipeTransform } from '@angular/core';

import { TableDefinition } from './models/tables';

@Pipe({
  name: 'columns'
})
export class ColumnsPipe implements PipeTransform {
  transform<T>(table: TableDefinition<T>): (keyof T)[] {
    return table.columns.map(column => column.id);
  }
}
