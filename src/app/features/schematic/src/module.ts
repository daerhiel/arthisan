import { NgModule } from '@angular/core';

import { Schematic } from './schematic';

const declarations = [
  Schematic
];

@NgModule({
  imports: [...declarations],
  exports: [...declarations]
})
export class SchematicModule { }
