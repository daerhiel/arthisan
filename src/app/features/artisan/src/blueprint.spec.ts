import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { CraftingRecipeData } from '@app/nw-data';
import { NwBuddyApi } from '@app/nw-buddy';
import { GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Materials } from './materials';
import { Equipment } from './equipment';
import { Entity } from './entity';
import { Craftable } from './craftable';
import { Category } from './category';
import { Blueprint, getIngredients } from './blueprint';
import { Assembly } from './assembly';
import { Projection } from './projection';
import { Ingredient } from './ingredient';

function extractData(ingredient: Ingredient) {
  return {
    id: ingredient.entity.id,
    type: ingredient.entity.constructor,
    quantity: ingredient.quantity,
  };
}

describe('Blueprint', () => {
  let service: Artisan;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: NwBuddyApi, useClass: NwBuddyApiMock },
        { provide: GamingToolsApi, useClass: GamingToolsApiMock }
      ]
    });

    service = TestBed.inject(Artisan);
    TestBed.tick();
  });

  it('should throw on missing artisan instance', () => {
    expect(() => new Blueprint(null!, null!, null!)).toThrowError('Invalid artisan instance.');
  });

  it('should throw on missing entity data', () => {
    expect(() => new Blueprint(service, null!, null!)).toThrowError('Invalid entity data.');
  });

  it('should create a blueprint for T2 ingot', () => {
    const id = 'IngotT2';
    const entity = service.getCraftable(id);
    const [recipe] = service.data.recipes.get(id) ?? [];

    const blueprint = new Blueprint(service, entity, recipe);
    blueprint.initialize();

    expect(blueprint).toBeTruthy();
    expect(blueprint.entity).toBe(entity);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'OreT1', type: Entity, quantity: 4 }
    ]);
    expect(blueprint.bonus).toBe(0);
    expect(blueprint.chance).toBe(0.3);
  });

  it('should create a blueprint for T3 ingot', () => {
    const id = 'IngotT3';
    const entity = service.getCraftable(id);
    const [recipe] = service.data.recipes.get(id) ?? [];

    const blueprint = new Blueprint(service, entity, recipe);
    blueprint.initialize();

    expect(blueprint).toBeTruthy();
    expect(blueprint.entity).toBe(entity);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'IngotT2', type: Craftable, quantity: 3 },
      { id: 'CharcoalT1', type: Craftable, quantity: 2 },
      { id: 'FluxT5', type: Entity, quantity: 1 }
    ]);
    expect(blueprint.bonus).toBe(-0.02);
    expect(blueprint.chance).toBeCloseTo(0.28);
  });

  it('should create a blueprint with T4 ingot', () => {
    const id = 'IngotT4';
    const entity = service.getCraftable(id);
    const [recipe] = service.data.recipes.get(id) ?? [];

    const blueprint = new Blueprint(service, entity, recipe);
    blueprint.initialize();

    expect(blueprint).toBeTruthy();
    expect(blueprint.entity).toBe(entity);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'IngotT3', type: Craftable, quantity: 2 },
      { id: 'CharcoalT1', type: Craftable, quantity: 2 },
      { id: 'OreT4', type: Entity, quantity: 6 },
      { id: 'FluxT5', type: Entity, quantity: 1 }
    ]);
    expect(blueprint.bonus).toBe(-0.05);
    expect(blueprint.chance).toBe(0.25);
  });

  it('should create a blueprint with T5 ingot', () => {
    const id = 'IngotT5';
    const entity = service.getCraftable(id);
    const [recipe] = service.data.recipes.get(id) ?? [];

    const blueprint = new Blueprint(service, entity, recipe);
    blueprint.initialize();

    expect(blueprint).toBeTruthy();
    expect(blueprint.entity).toBe(entity);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'IngotT4', type: Craftable, quantity: 2 },
      { id: 'CharcoalT1', type: Craftable, quantity: 2 },
      { id: 'OreT5', type: Entity, quantity: 8 },
      { id: 'FluxT5', type: Entity, quantity: 1 }
    ]);
    expect(blueprint.bonus).toBe(-0.07);
    expect(blueprint.chance).toBeCloseTo(0.23);
  });

  it('should create a blueprint with T52 ingot', () => {
    const id = 'IngotT52';
    const entity = service.getCraftable(id);
    const [recipe] = service.data.recipes.get(id) ?? [];

    const blueprint = new Blueprint(service, entity, recipe);
    blueprint.initialize();

    expect(blueprint).toBeTruthy();
    expect(blueprint.entity).toBe(entity);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'IngotT5', type: Craftable, quantity: 2 },
      { id: 'CharcoalT1', type: Craftable, quantity: 2 },
      { id: 'OreT52', type: Entity, quantity: 12 },
      { id: 'FluxT5', type: Entity, quantity: 1 }
    ]);
    expect(blueprint.bonus).toBe(-0.2);
    expect(blueprint.chance).toBeCloseTo(0.1);
  });

  it('should create a blueprint with category', () => {
    const id = 'RubyT2';
    const entity = service.getCraftable(id);
    const [recipe] = service.data.recipes.get(id) ?? [];

    const blueprint = new Blueprint(service, entity, recipe);
    blueprint.initialize();

    expect(blueprint).toBeTruthy();
    expect(blueprint.entity).toBe(entity);
    expect(blueprint.ingredients.map(extractData)).toEqual([
      { id: 'AlchemyFireT2', type: Craftable, quantity: 1 },
      { id: 'RubyT1', type: Entity, quantity: 3 },
      { id: 'Solvent', type: Category, quantity: 2 }
    ]);
  });

  it('should not get context for raw resource', () => {
    const id = 'OreT1';
    const entity = service.getEntity(id) as Craftable;
    const [recipe] = service.data.recipes.get(id) ?? [];

    const blueprint = new Blueprint(service, entity, recipe);
    blueprint.initialize();

    const context = blueprint.getContext();
    expect(context).toBeNull();
  });

  it('should get context for refined resource', () => {
    const id = 'IngotT2';
    const entity = service.getCraftable(id);
    const [recipe] = service.data.recipes.get(id) ?? [];

    const blueprint = new Blueprint(service, entity, recipe);
    blueprint.initialize();

    const context = blueprint.getContext();
    expect(context).toBeInstanceOf(Equipment);
  });

  it('should request a projection', () => {
    const id = 'IngotT2';
    const entity = service.getCraftable(id);
    const [recipe] = service.data.recipes.get(id) ?? [];

    const assembly = jasmine.createSpyObj<Assembly>('Assembly', ['entity']);
    const materials = new Materials();
    const blueprint = new Blueprint(service, entity, recipe);
    blueprint.initialize();

    const projection = blueprint.request(assembly, materials);
    expect(projection).toBeInstanceOf(Projection);
    expect(projection.blueprint).toBe(blueprint);
    expect(projection.materials).toBe(materials);
  });
});

describe('getIngredients', () => {
  it('should get 0 ingredients from empty recipe', () => {
    const recipe: Partial<CraftingRecipeData> = {
    };
    const result = getIngredients(recipe as CraftingRecipeData);
    expect(result).toEqual([]);
  });

  it('should get 1 ingredient from 1x recipe', () => {
    const recipe: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
    };
    const result = getIngredients(recipe as CraftingRecipeData);
    expect(result).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 }
    ]);
  });

  it('should get 2 ingredients from 2x recipe', () => {
    const recipe: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Ingredient2: 'OreT2',
      Type2: 'Item',
      Qty2: 2,
    };
    const result = getIngredients(recipe as CraftingRecipeData);
    expect(result).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT2', type: 'Item', quantity: 2 }
    ]);
  });

  it('should get 3 ingredients from 3x recipe', () => {
    const recipe: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Ingredient2: 'OreT2',
      Type2: 'Item',
      Qty2: 2,
      Ingredient3: 'OreT3',
      Type3: 'Item',
      Qty3: 3,
    };
    const result = getIngredients(recipe as CraftingRecipeData);
    expect(result).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT2', type: 'Item', quantity: 2 },
      { id: 'OreT3', type: 'Item', quantity: 3 }
    ]);
  });

  it('should get 4 ingredients from 4x recipe', () => {
    const recipe: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Ingredient2: 'OreT2',
      Type2: 'Item',
      Qty2: 2,
      Ingredient3: 'OreT3',
      Type3: 'Item',
      Qty3: 3,
      Ingredient4: 'OreT4',
      Type4: 'Item',
      Qty4: 4,
    };
    const result = getIngredients(recipe as CraftingRecipeData);
    expect(result).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT2', type: 'Item', quantity: 2 },
      { id: 'OreT3', type: 'Item', quantity: 3 },
      { id: 'OreT4', type: 'Item', quantity: 4 }
    ]);
  });

  it('should get 5 ingredients from 5x recipe', () => {
    const recipe: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Ingredient2: 'OreT2',
      Type2: 'Item',
      Qty2: 2,
      Ingredient3: 'OreT3',
      Type3: 'Item',
      Qty3: 3,
      Ingredient4: 'OreT4',
      Type4: 'Item',
      Qty4: 4,
      Ingredient5: 'OreT5',
      Type5: 'Item',
      Qty5: 5,
    };
    const result = getIngredients(recipe as CraftingRecipeData);
    expect(result).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT2', type: 'Item', quantity: 2 },
      { id: 'OreT3', type: 'Item', quantity: 3 },
      { id: 'OreT4', type: 'Item', quantity: 4 },
      { id: 'OreT5', type: 'Item', quantity: 5 }
    ]);
  });

  it('should get 6 ingredients from 6x recipe', () => {
    const recipe: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Ingredient2: 'OreT2',
      Type2: 'Item',
      Qty2: 2,
      Ingredient3: 'OreT3',
      Type3: 'Item',
      Qty3: 3,
      Ingredient4: 'OreT4',
      Type4: 'Item',
      Qty4: 4,
      Ingredient5: 'OreT5',
      Type5: 'Item',
      Qty5: 5,
      Ingredient6: 'OreT51',
      Type6: 'Item',
      Qty6: 6,
    };
    const result = getIngredients(recipe as CraftingRecipeData);
    expect(result).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT2', type: 'Item', quantity: 2 },
      { id: 'OreT3', type: 'Item', quantity: 3 },
      { id: 'OreT4', type: 'Item', quantity: 4 },
      { id: 'OreT5', type: 'Item', quantity: 5 },
      { id: 'OreT51', type: 'Item', quantity: 6 }
    ]);
  });

  it('should get 7 ingredients from 7x recipe', () => {
    const recipe: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Ingredient2: 'OreT2',
      Type2: 'Item',
      Qty2: 2,
      Ingredient3: 'OreT3',
      Type3: 'Item',
      Qty3: 3,
      Ingredient4: 'OreT4',
      Type4: 'Item',
      Qty4: 4,
      Ingredient5: 'OreT5',
      Type5: 'Item',
      Qty5: 5,
      Ingredient6: 'OreT51',
      Type6: 'Item',
      Qty6: 6,
      Ingredient7: 'OreT52',
      Type7: 'Item',
      Qty7: 7,
    };
    const result = getIngredients(recipe as CraftingRecipeData);
    expect(result).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT2', type: 'Item', quantity: 2 },
      { id: 'OreT3', type: 'Item', quantity: 3 },
      { id: 'OreT4', type: 'Item', quantity: 4 },
      { id: 'OreT5', type: 'Item', quantity: 5 },
      { id: 'OreT51', type: 'Item', quantity: 6 },
      { id: 'OreT52', type: 'Item', quantity: 7 }
    ]);
  });

  it('should default type to Item', () => {
    const recipe: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Qty1: 1,
    };
    const result = getIngredients(recipe as CraftingRecipeData);
    expect(result).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 }
    ]);
  });

  it('should drop item with undefined ingredient id', () => {
    const recipe: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Type2: 'Item',
      Qty2: 2,
      Ingredient3: 'OreT3',
      Type3: 'Item',
      Qty3: 3
    };
    const result = getIngredients(recipe as CraftingRecipeData);
    expect(result).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT3', type: 'Item', quantity: 3 }
    ]);
  });

  it('should drop item with missing ingredient id', () => {
    const recipe: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Ingredient2: undefined,
      Type2: 'Item',
      Qty2: 2,
      Ingredient3: 'OreT3',
      Type3: 'Item',
      Qty3: 3
    };
    const result = getIngredients(recipe as CraftingRecipeData);
    expect(result).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT3', type: 'Item', quantity: 3 }
    ]);
  });

  it('should drop an item with missing quantity', () => {
    const recipe: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Ingredient2: 'OreT2',
      Type2: 'Item',
      Ingredient3: 'OreT3',
      Type3: 'Item',
      Qty3: 3
    };
    const result = getIngredients(recipe as CraftingRecipeData);
    expect(result).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT3', type: 'Item', quantity: 3 }
    ]);
  });

  it('should drop an item with 0 quantity', () => {
    const recipe: Partial<CraftingRecipeData> = {
      Ingredient1: 'OreT1',
      Type1: 'Item',
      Qty1: 1,
      Ingredient2: 'OreT2',
      Type2: 'Item',
      Qty2: 0,
      Ingredient3: 'OreT3',
      Type3: 'Item',
      Qty3: 3
    };
    const result = getIngredients(recipe as CraftingRecipeData);
    expect(result).toEqual([
      { id: 'OreT1', type: 'Item', quantity: 1 },
      { id: 'OreT3', type: 'Item', quantity: 3 }
    ]);
  });
});
