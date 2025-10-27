import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltip } from '@angular/material/tooltip';

import { InstancePipe } from '@app/core';
import { Assembly, Production, Purchase } from '@features/artisan';
import { NwIcon, LocalizePipe, NwPrice } from '@app/nw-buddy';

@Component({
  selector: 'app-resource',
  imports: [
    DecimalPipe, FormsModule,
    MatCardModule, MatTableModule,
    MatInput, MatButton, MatSlideToggle, MatTooltip,
    NwIcon, NwPrice, InstancePipe, LocalizePipe
],
  templateUrl: './resource.html',
  styleUrl: './resource.scss',
  providers: [
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { position: 'above' } }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Resource {
  protected readonly Assembly = Assembly;
  protected readonly Production = Production;

  protected readonly columns = ["quantity", "action", "price", "sign", "total"];

  protected readonly tooltips = {
    crafted: 'Craft this item',
    chance: 'Extra item chance',
    effective: 'Should craft at station',
    requested: 'Should purchase on market'
  };

  readonly data = input<Purchase>();
}
