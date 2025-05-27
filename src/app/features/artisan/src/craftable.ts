import { computed } from '@angular/core';

import { defineColumn } from '@app/core';
import { Entity } from './entity';
import { Blueprint } from './blueprint';

export class Craftable extends Entity {
  readonly #recipes = computed(() => this.artisan.data.recipes.get(this.id));

  readonly blueprints = computed(() => this.#recipes()?.map(recipe =>
    new Blueprint(this.artisan, this, recipe)) ?? null
  );
}

export const craftableBlueprints = defineColumn<Craftable>({
  id: 'blueprints',
  displayName: 'Recipes',
  width: '2%',
  value: { fit: x => x.blueprints()?.length.toString() }
});
