import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';

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
  readonly #data: Assembly = inject(MAT_DIALOG_DATA);
  readonly #ref = inject(MatDialogRef);

  readonly #origin = this.#data.materials.getState();
  readonly #assembly = toSignal(this.#ref.beforeClosed().pipe(map(save => {
    const assembly = this.#data;
    if (assembly.entity) {
      if (save) {
        const materials = getStorageItem<Record<string, MaterialsState>>(MATERIALS_STORAGE_KEY, {});
        materials[assembly.entity.id] = assembly.materials.getState();
        setStorageItem(MATERIALS_STORAGE_KEY, materials);
      } else {
        assembly.materials.setState(this.#origin);
      }
    }
    return assembly;
  })), { initialValue: this.#data });

  readonly stages = computed(() => this.#assembly().materials.prepare());
}
