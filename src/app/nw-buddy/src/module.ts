import { NgModule } from '@angular/core';

import { LocalizePipe } from './localize-pipe';
import { NwIcon } from './nw-icon';
import { NwPrice } from './nw-price';

const declarations = [
  LocalizePipe,
  NwIcon,
  NwPrice
];

@NgModule({
  imports: [...declarations],
  exports: [...declarations]
})
export class NwBuddyModule { }
