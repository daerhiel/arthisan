import { CraftingRecipeData, HouseItems, MasterItemDefinitions } from '@app/nw-data';
import { Artisan } from './artisan';
import { Materials } from './contracts';
import { Entity } from './entity';
import { Blueprint } from './blueprint';
import { Assembly } from './assembly';

export class Craftable extends Entity implements Materials<Assembly> {
  readonly blueprints: Blueprint[];

  constructor(artisan: Artisan, item: MasterItemDefinitions | HouseItems, recipes: CraftingRecipeData[]) {
    super(artisan, item);
    if (!recipes) {
      throw new Error('Invalid recipes data.');
    }
    this.blueprints = recipes.map(recipe => new Blueprint(artisan, this, recipe));
  }

  /** @inheritdoc */
  override request(): Assembly {
    return new Assembly(this);
  }
}
