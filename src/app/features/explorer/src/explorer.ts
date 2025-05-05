import { Component, inject } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { Artisan, ColumnPipe, ColumnsPipe } from '@features/artisan';

@Component({
  imports: [NgComponentOutlet, MatTableModule, ColumnsPipe, ColumnPipe],
  templateUrl: './explorer.html',
  styleUrl: './explorer.scss'
})
export class ExplorerComponent {
  readonly #nw = inject(Artisan);

  readonly craftables = this.#nw.craftables;
}
