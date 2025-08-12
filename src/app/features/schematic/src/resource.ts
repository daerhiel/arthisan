import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';

import { InstancePipe } from '@app/core';
import { Assembly, Purchase } from '@features/artisan';
import { NwIcon, LocalizePipe } from '@app/nw-buddy';

@Component({
  selector: 'app-resource',
  imports: [
    DecimalPipe, FormsModule,
    MatCardModule, MatTableModule,
    MatSlideToggle, MatTooltip,
    NwIcon, InstancePipe, LocalizePipe
],
  templateUrl: './resource.html',
  styleUrl: './resource.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Resource {
  protected readonly Assembly = Assembly;


  data = input<Purchase>();
}
