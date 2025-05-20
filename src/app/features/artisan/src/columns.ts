import { Pipe, PipeTransform } from '@angular/core';

import { TableDefinition } from '@app/core';

@Pipe({
  name: 'columns'
})
export class ColumnsPipe implements PipeTransform {
  transform<T extends object>(table: TableDefinition<T>): (keyof T)[] {
    return table.columns.map(column => column.id);
  }
}
