import { NgModule } from '@angular/core';

import { Opener } from './opener';
import { ColumnsPipe } from './columns';
import { ColumnPipe } from './column';

const declarations = [
  Opener,
  ColumnsPipe,
  ColumnPipe
];

@NgModule({
  imports: [...declarations],
  exports: [...declarations]
})
export class ArtisanModule { }
