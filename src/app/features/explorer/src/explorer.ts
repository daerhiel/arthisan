import { Component, effect, inject, ViewChild } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { Artisan, ColumnPipe, ColumnsPipe, Craftable } from '@features/artisan';

@Component({
  imports: [
    NgComponentOutlet,
    MatTableModule, MatSortModule,
    ColumnsPipe, ColumnPipe
  ],
  templateUrl: './explorer.html',
  styleUrl: './explorer.scss'
})
export class ExplorerComponent {
  readonly #nw = inject(Artisan);

  readonly craftables = this.#nw.craftables;
  readonly data = new MatTableDataSource<Craftable>();

  protected _refresh = effect(() => {
    this.data.data = this.#nw.craftables.data();
  });

  @ViewChild(MatSort)
  set sort(sort: MatSort) {
    this.data.sort = sort;
  }
}
