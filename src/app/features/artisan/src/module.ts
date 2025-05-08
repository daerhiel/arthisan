import { NgModule } from '@angular/core';

import { ColumnsPipe } from './columns';
import { ColumnPipe } from './column';

const declarations = [
  ColumnsPipe,
  ColumnPipe
];

@NgModule({
  imports: [...declarations],
  exports: [...declarations]
})
export class ArtisanModule { }
