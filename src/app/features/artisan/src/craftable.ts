import { CraftingRecipeData, HouseItems, MasterItemDefinitions } from '@app/nw-data';
import { Artisan } from './artisan';
import { Materials, Material } from './materials';
import { Entity } from './entity';
import { Blueprint } from './blueprint';
import { Assembly } from './assembly';

/**
 * Represents a craftable entity in the artisan system, which can be a master item or housing.
 */
export class Craftable extends Entity implements Material<Assembly> {
  readonly blueprints: Blueprint[];

  /**
   * Creates a new Craftable instance.
   * @param artisan The artisan instance that provides access to data.
   * @param item The master item or housing item for the craftable entity.
   * @param recipes The crafting recipes associated with the craftable entity.
   * @throws Will throw an error if the artisan instance is invalid.
   * @throws Will throw an error if the item data is invalid.
   * @throws Will throw an error if the recipes data is invalid.
   */
  constructor(artisan: Artisan, item: MasterItemDefinitions | HouseItems, recipes: CraftingRecipeData[]) {
    super(artisan, item);
    if (!recipes) {
      throw new Error('Invalid recipes data.');
    }
    this.blueprints = recipes.map(recipe => new Blueprint(artisan, this, recipe));
  }

  /** @inheritdoc */
  override initialize(): void {
    super.initialize();
    for (const blueprint of this.blueprints) {
      blueprint.initialize();
    }
  }

  /** @inheritdoc */
  override request(materials?: Materials): Assembly {
    return new Assembly(this, materials);
  }
}
