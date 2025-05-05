import { Component, inject } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { ColumnsPipe, ColumnPipe, NwBuddy } from '@app/nw-buddy';

@Component({
  imports: [NgComponentOutlet, MatTableModule, ColumnsPipe, ColumnPipe],
  templateUrl: './explorer.html',
  styleUrl: './explorer.scss'
})
export class ExplorerComponent {
  readonly #nw = inject(NwBuddy);

  readonly recipes = this.#nw.recipeDefs;
}
