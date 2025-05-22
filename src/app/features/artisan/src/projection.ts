import { computed } from "@angular/core";

import { Blueprint } from "./blueprint";
import { Provision } from "./provision";

export class Projection {
  readonly materials = computed(() =>
    this.blueprint.ingredients.map(ingredient => new Provision(ingredient))
  );

  constructor(readonly blueprint: Blueprint) {
    if (!blueprint) {
      throw new Error('Invalid blueprint instance.');
    }
  }
}
