import { computed } from '@angular/core';

import { Artisan } from './artisan';
import { Entity } from './entity';

/**
 * Represents a category of items in the artisan system.
 */
export class Category {
  readonly #items = computed(() => this.artisan.data.ingredients.get(this.id));
  readonly #category = computed(() => this.artisan.data.categories.get(this.id));

  /**
   * The category name.
   */
  readonly #name = computed(() =>
    this.#category()?.DisplayText ?? null
  );
  get name(): string | null {
    return this.#name();
  }

  /**
   * The list of entities in the category.
   */
  readonly #entities = computed(() => {
    const items = this.#items();
    return items ? items.map(item => this.artisan.getEntity(item.ItemID)).filter(item => !!item) : null;
  });
  get entities(): Entity[] | null {
    return this.#entities();
  }

  /**
   * Creates a new Category instance.
   * @param artisan The artisan instance to use for crafting.
   * @param id A category ID.
   * @throws Will throw an error if the artisan is invalid.
   */
  constructor(private readonly artisan: Artisan, readonly id: string) {
    if (!artisan) {
      throw new Error('Invalid artisan instance.');
    }
  }
}
