import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

import { getStorageItem, setStorageItem } from '@app/core';
import { Assembly, MATERIALS_STORAGE_KEY, MaterialsState } from '@features/artisan';
import { Resource } from "./resource";

@Component({
  selector: 'app-schematic',
  imports: [
    MatDialogModule, MatButtonModule,
    Resource
  ],
  templateUrl: './schematic.html',
  styleUrl: './schematic.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Schematic {
  readonly data: Assembly = inject(MAT_DIALOG_DATA);

  readonly stages = computed(() => this.data.projection?.materials.prepare() ?? null);

  save(): void {
    const assembly = this.data;
    if (assembly.entity) {
      const materials = getStorageItem<Record<string, MaterialsState>>(MATERIALS_STORAGE_KEY, {});
      materials[assembly.entity.id] = assembly.materials.getState();
      setStorageItem(MATERIALS_STORAGE_KEY, materials);
    }
  }
}
