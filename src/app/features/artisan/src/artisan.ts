import { computed, inject, Injectable } from '@angular/core';

import { TableDefinition } from '@app/core';
import { NwBuddy, NwIcon } from '@app/nw-buddy';
import { Craftable, getIconInputs } from './craftable';

@Injectable({
  providedIn: 'root'
})
export class Artisan {
  readonly #data = inject(NwBuddy);

  readonly craftables: TableDefinition<Craftable> = {
    name: 'recipes',
    columns: [
      { id: 'icon', displayName: 'Icon', width: '0', value: { component: NwIcon, inputs: getIconInputs } },
      { id: 'name', displayName: 'Name', width: '98%', value: { get: item => item.name() } },
      { id: 'recipes', displayName: 'Recipes', width: '2%', value: { get: item => item.recipes().toString() } }
    ],
    data: computed(() => {
      const objects: Craftable[] = [];
      for (const key of this.#data.recipes.keys() ?? []) {
        objects.push(new Craftable(this.#data, key));
      }
      return objects;
    })
  };
}
