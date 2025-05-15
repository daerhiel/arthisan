import { TestBed } from "@angular/core/testing";
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from "./artisan";
import { Blueprint } from "./blueprint";
import { Ingredient } from "./ingredient";
import { CraftingRecipeData } from "@app/nw-data";

function extractData(ingredient: Ingredient) {
  return {
    id: ingredient.id,
    type: ingredient.type,
    quantity: ingredient.quantity,
  };
}

describe('Blueprint', () => {
  let service: Artisan;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NwBuddyApi, useClass: NwBuddyApiMock },
        { provide: GamingToolsApi, useClass: GamingToolsApiMock }
      ]
    });
    service = TestBed.inject(Artisan);
  });

  it('should throw on missing artisan instance', () => {
    expect(() => new Blueprint(null!, null!, null!)).toThrowError('Invalid artisan instance.');
  });

  it('should throw on missing item data', () => {
    expect(() => new Blueprint(service, null!, null!)).toThrowError('Invalid item data.');
  });

  it('should create a blueprint for T2 ingot', () => {
    const id = 'IngotT2';
    const item = service.getItem(id)!;
    const [recipe] = service.data.recipes.get(id) ?? [];
    const blueprint = new Blueprint(service, item, recipe);
    expect(blueprint).toBeTruthy();
    expect(blueprint.item).toBe(item);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 4 }]);
  });

  it('should create a blueprint for T3 ingot', () => {
    const id = 'IngotT3';
    const item = service.getItem(id)!;
    const [recipe] = service.data.recipes.get(id) ?? [];
    const blueprint = new Blueprint(service, item, recipe);
    expect(blueprint).toBeTruthy();
    expect(blueprint.item).toBe(item);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'IngotT2', type: 'Item', quantity: 3 },
      { id: 'FluxT5', type: 'Item', quantity: 1 },
      { id: 'CharcoalT1', type: 'Item', quantity: 2 }
    ]);
  });

  it('should create a blueprint with T4 ingot', () => {
    const id = 'IngotT4';
    const item = service.getItem(id)!;
    const [recipe] = service.data.recipes.get(id) ?? [];
    const blueprint = new Blueprint(service, item, recipe);
    expect(blueprint).toBeTruthy();
    expect(blueprint.item).toBe(item);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'OreT4', type: 'Item', quantity: 6 },
      { id: 'IngotT3', type: 'Item', quantity: 2 },
      { id: 'FluxT5', type: 'Item', quantity: 1 },
      { id: 'CharcoalT1', type: 'Item', quantity: 2 }
    ]);
  });

  it('should create a blueprint with T5 ingot', () => {
    const id = 'IngotT5';
    const item = service.getItem(id)!;
    const [recipe] = service.data.recipes.get(id) ?? [];
    const blueprint = new Blueprint(service, item, recipe);
    expect(blueprint).toBeTruthy();
    expect(blueprint.item).toBe(item);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'OreT5', type: 'Item', quantity: 8 },
      { id: 'IngotT4', type: 'Item', quantity: 2 },
      { id: 'FluxT5', type: 'Item', quantity: 1 },
      { id: 'CharcoalT1', type: 'Item', quantity: 2 }
    ]);
  });

  it('should create a blueprint with T52 ingot', () => {
    const id = 'IngotT52';
    const item = service.getItem(id)!;
    const [recipe] = service.data.recipes.get(id) ?? [];
    const blueprint = new Blueprint(service, item, recipe);
    expect(blueprint).toBeTruthy();
    expect(blueprint.item).toBe(item);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'OreT52', type: 'Item', quantity: 12 },
      { id: 'IngotT5', type: 'Item', quantity: 2 },
      { id: 'FluxT5', type: 'Item', quantity: 1 },
      { id: 'CharcoalT1', type: 'Item', quantity: 2 }
    ]);
  });

  it('should create empty blueprint', () => {
    const id = 'OreT1';
    const item = service.getItem(id)!;
    const recipe0: Partial<CraftingRecipeData> = {
    };
    const blueprint = new Blueprint(service, item, recipe0 as CraftingRecipeData);
    expect(blueprint).toBeTruthy();
    expect(blueprint.item).toBe(item);
    expect(blueprint.ingredients).toEqual([]);
  });

  it('should create a blueprint with 1 ingredient', () => {
    const id = 'OreT1';
    const item = service.getItem(id)!;
    const recipe0: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
    };
    const blueprint = new Blueprint(service, item, recipe0 as CraftingRecipeData);
    expect(blueprint).toBeTruthy();
    expect(blueprint.item).toBe(item);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 }
    ]);
  });

  it('should create a blueprint with 2 ingredients', () => {
    const id = 'OreT1';
    const item = service.getItem(id)!;
    const recipe0: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Ingredient2: 'OreT1',
      Type2: 'Item',
      Qty2: 2,
    };
    const blueprint = new Blueprint(service, item, recipe0 as CraftingRecipeData);
    expect(blueprint).toBeTruthy();
    expect(blueprint.item).toBe(item);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT1', type: 'Item', quantity: 2 }
    ]);
  });

  it('should create a blueprint with 3 ingredients', () => {
    const id = 'OreT1';
    const item = service.getItem(id)!;
    const recipe0: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Ingredient2: 'OreT1',
      Type2: 'Item',
      Qty2: 2,
      Ingredient3: 'OreT1',
      Type3: 'Item',
      Qty3: 3,
    };
    const blueprint = new Blueprint(service, item, recipe0 as CraftingRecipeData);
    expect(blueprint).toBeTruthy();
    expect(blueprint.item).toBe(item);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT1', type: 'Item', quantity: 2 },
      { id: 'OreT1', type: 'Item', quantity: 3 }
    ]);
  });

  it('should create a blueprint with 4 ingredients', () => {
    const id = 'OreT1';
    const item = service.getItem(id)!;
    const recipe0: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Ingredient2: 'OreT1',
      Type2: 'Item',
      Qty2: 2,
      Ingredient3: 'OreT1',
      Type3: 'Item',
      Qty3: 3,
      Ingredient4: 'OreT1',
      Type4: 'Item',
      Qty4: 4,
    };
    const blueprint = new Blueprint(service, item, recipe0 as CraftingRecipeData);
    expect(blueprint).toBeTruthy();
    expect(blueprint.item).toBe(item);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT1', type: 'Item', quantity: 2 },
      { id: 'OreT1', type: 'Item', quantity: 3 },
      { id: 'OreT1', type: 'Item', quantity: 4 }
    ]);
  });

  it('should create a blueprint with 5 ingredients', () => {
    const id = 'OreT1';
    const item = service.getItem(id)!;
    const recipe0: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Ingredient2: 'OreT1',
      Type2: 'Item',
      Qty2: 2,
      Ingredient3: 'OreT1',
      Type3: 'Item',
      Qty3: 3,
      Ingredient4: 'OreT1',
      Type4: 'Item',
      Qty4: 4,
      Ingredient5: 'OreT1',
      Type5: 'Item',
      Qty5: 5,
    };
    const blueprint = new Blueprint(service, item, recipe0 as CraftingRecipeData);
    expect(blueprint).toBeTruthy();
    expect(blueprint.item).toBe(item);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT1', type: 'Item', quantity: 2 },
      { id: 'OreT1', type: 'Item', quantity: 3 },
      { id: 'OreT1', type: 'Item', quantity: 4 },
      { id: 'OreT1', type: 'Item', quantity: 5 }
    ]);
  });

  it('should create a blueprint with 6 ingredients', () => {
    const id = 'OreT1';
    const item = service.getItem(id)!;
    const recipe0: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Ingredient2: 'OreT1',
      Type2: 'Item',
      Qty2: 2,
      Ingredient3: 'OreT1',
      Type3: 'Item',
      Qty3: 3,
      Ingredient4: 'OreT1',
      Type4: 'Item',
      Qty4: 4,
      Ingredient5: 'OreT1',
      Type5: 'Item',
      Qty5: 5,
      Ingredient6: 'OreT1',
      Type6: 'Item',
      Qty6: 6,
    };
    const blueprint = new Blueprint(service, item, recipe0 as CraftingRecipeData);
    expect(blueprint).toBeTruthy();
    expect(blueprint.item).toBe(item);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT1', type: 'Item', quantity: 2 },
      { id: 'OreT1', type: 'Item', quantity: 3 },
      { id: 'OreT1', type: 'Item', quantity: 4 },
      { id: 'OreT1', type: 'Item', quantity: 5 },
      { id: 'OreT1', type: 'Item', quantity: 6 }
    ]);
  });

  it('should create a blueprint with 7 ingredients', () => {
    const id = 'OreT1';
    const item = service.getItem(id)!;
    const recipe0: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Ingredient2: 'OreT1',
      Type2: 'Item',
      Qty2: 2,
      Ingredient3: 'OreT1',
      Type3: 'Item',
      Qty3: 3,
      Ingredient4: 'OreT1',
      Type4: 'Item',
      Qty4: 4,
      Ingredient5: 'OreT1',
      Type5: 'Item',
      Qty5: 5,
      Ingredient6: 'OreT1',
      Type6: 'Item',
      Qty6: 6,
      Ingredient7: 'OreT1',
      Type7: 'Item',
      Qty7: 7,
    };
    const blueprint = new Blueprint(service, item, recipe0 as CraftingRecipeData);
    expect(blueprint).toBeTruthy();
    expect(blueprint.item).toBe(item);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT1', type: 'Item', quantity: 2 },
      { id: 'OreT1', type: 'Item', quantity: 3 },
      { id: 'OreT1', type: 'Item', quantity: 4 },
      { id: 'OreT1', type: 'Item', quantity: 5 },
      { id: 'OreT1', type: 'Item', quantity: 6 },
      { id: 'OreT1', type: 'Item', quantity: 7 }
    ]);
  });
});
