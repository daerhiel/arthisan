import { computed } from "@angular/core";

import { Artisan } from "./artisan";

export class Category {
  readonly #items = computed(() => this._artisan.data.ingredients.get(this.id));
  readonly #category = computed(() => this._artisan.data.categories.get(this.id));

  readonly name = computed(() => {
    const name = this.#category()?.DisplayText;
    return name ? this._artisan.i18n.get(name) : null;
  });

  readonly items = computed(() => {
    const items = this.#items();
    return items ? items.map(item => this._artisan.getItem(item.ItemID)).filter(item => !!item) : null;
  });

  constructor(private readonly _artisan: Artisan, readonly id: string) {
    if (!_artisan) {
      throw new Error('Invalid artisan instance.');
    }
  }
}
