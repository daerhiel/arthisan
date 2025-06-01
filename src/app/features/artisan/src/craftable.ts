import { computed } from '@angular/core';

import { Entity } from './entity';
import { Blueprint } from './blueprint';
import { Materials } from './contracts';
import { Assembly } from './assembly';

export class Craftable extends Entity implements Materials<Assembly> {
  readonly #recipes = computed(() => this.artisan.data.recipes.get(this.id));

  readonly blueprints = computed(() => this.#recipes()?.map(recipe =>
    new Blueprint(this.artisan, this, recipe)) ?? null
  );

  /** @inheritdoc */
  override request(): Assembly {
    return new Assembly(this);
  }
}
