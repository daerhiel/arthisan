import { NgModule } from '@angular/core';

import { AppSchematic } from './schematic';

const declarations = [
  AppSchematic
];

@NgModule({
  imports: [...declarations],
  exports: [...declarations]
})
export class SchematicModule { }
