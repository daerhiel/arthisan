import { NgModule } from '@angular/core';

import { NwIcon } from './nw-icon';
import { NwPrice } from './nw-price';

const declarations = [
  NwIcon,
  NwPrice
];

@NgModule({
  imports: [...declarations],
  exports: [...declarations]
})
export class NwBuddyModule { }
