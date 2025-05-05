import { NgModule } from '@angular/core';

import { ColumnsPipe } from './columns';
import { NwIcon } from './nw-icon';
import { ColumnPipe } from './column';

const declarations = [
  ColumnsPipe,
  ColumnPipe,
  NwIcon
];

@NgModule({
  imports: [...declarations],
  exports: [...declarations]
})
export class NwBuddyModule { }
