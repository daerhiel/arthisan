import { CraftingCategoryData, MasterItemDefinitions } from '@app/nw-data';
import { Artisan } from './artisan';
import { Entity } from './entity';

/**
 * Represents a category of items in the artisan system.
 */
export class Category {
  readonly #category: CraftingCategoryData;

  get id(): string { return this.#category.CategoryID; }
  get name(): string | null { return this.#category.DisplayText; }

  /**
   * The list of entities in the category.
   */
  readonly entities: Entity[];

  /**
   * Creates a new Category instance.
   * @param artisan The artisan instance to use for crafting.
   * @param category The crafting category data for this category.
   * @throws Will throw an error if the artisan is invalid.
   */
  constructor(private readonly artisan: Artisan, category: CraftingCategoryData, items: MasterItemDefinitions[]) {
    if (!artisan) {
      throw new Error('Invalid artisan instance.');
    }
    if (!category) {
      throw new Error('Invalid category data.');
    }
    if (!items) {
      throw new Error('Invalid items data.');
    }

    this.#category = category;
    this.entities = items.map(item => {
      const entity = this.artisan.getEntity(item.ItemID);
      if (!entity) {
        throw new Error(`Entity not found for item: ${item.ItemID}`);
      }
      return entity;
    });
  }
}
