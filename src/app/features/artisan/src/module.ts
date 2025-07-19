import { NgModule } from '@angular/core';

import { AppOpener } from './opener';
import { ColumnsPipe } from './columns';
import { ColumnPipe } from './column';

const declarations = [
  AppOpener,
  ColumnsPipe,
  ColumnPipe
];

@NgModule({
  imports: [...declarations],
  exports: [...declarations]
})
export class ArtisanModule { }
