import { provideZonelessChangeDetection } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Materials } from './materials';
import { CraftingIngredientData, Ingredient } from './ingredient';
import { Provision } from './provision';

describe('Provision', () => {
  let service: Artisan;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: NwBuddyApi, useClass: NwBuddyApiMock },
        { provide: GamingToolsApi, useClass: GamingToolsApiMock }
      ]
    });
    service = TestBed.inject(Artisan);

    const gaming = TestBed.inject(GamingTools);
    gaming.select({ name: 'Server1', age: 100 });
    while (gaming.isLoading()) {
      await firstValueFrom(timer(100));
    }
  });

  it('should throw for non-existing ingredient', () => {
    expect(() => new Provision(null!, null!)).toThrowError(/invalid ingredient instance/i);
  });

  it('should throw for non-existing materials', () => {
    const data: CraftingIngredientData = { id: 'OreT1', type: 'Item', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    expect(() => new Provision(ingredient, null!)).toThrowError(/invalid materials instance/i);
  });

  it('should create an entity provision', () => {
    const data: CraftingIngredientData = { id: 'OreT1', type: 'Item', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    const materials = new Materials();
    const provision = new Provision(ingredient, materials);
    expect(provision).toBeTruthy();
    expect(provision.ingredient).toBe(ingredient);

    ingredient.initialize();
    expect(provision.purchase?.entity.id).toBe('OreT1');
  });

  it('should create a craftable entity provision', () => {
    const data: CraftingIngredientData = { id: 'IngotT2', type: 'Item', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    const materials = new Materials();
    const provision = new Provision(ingredient, materials);
    expect(provision).toBeTruthy();
    expect(provision.ingredient).toBe(ingredient);
    expect(provision.materials).toBe(materials);

    ingredient.initialize();
    expect(provision.purchase?.entity.id).toBe('IngotT2');
  });

  it('should create a category provision', () => {
    const data: CraftingIngredientData = { id: 'FluxReagentsT5', type: 'Category_Only', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    const materials = new Materials();
    const provision = new Provision(ingredient, materials);
    expect(provision).toBeTruthy();
    expect(provision.ingredient).toBe(ingredient);
    expect(provision.materials).toBe(materials);

    ingredient.initialize();
    expect(provision.purchase?.entity.id).toBe('SandpaperT5');
  });

  it('should select an item in category provision', () => {
    const data: CraftingIngredientData = { id: 'FluxReagentsT5', type: 'Category_Only', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    const materials = new Materials();
    const provision = new Provision(ingredient, materials);
    expect(provision).toBeTruthy();
    expect(provision.ingredient).toBe(ingredient);
    expect(provision.materials).toBe(materials);

    ingredient.initialize();
    provision.selected.set('TanninT5');
    expect(provision.purchase?.entity.id).toBe('TanninT5');
  });

  it('should auto select cheapest entity in category provision', () => {
    const data: CraftingIngredientData = { id: 'FluxReagentsT5', type: 'Category_Only', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    const materials = new Materials();
    const provision = new Provision(ingredient, materials);
    expect(provision).toBeTruthy();
    expect(provision.ingredient).toBe(ingredient);
    expect(provision.materials).toBe(materials);

    ingredient.initialize();
    provision.automatic.set(true);
    expect(provision.purchase?.entity.id).toBe('SolventT5');
  });

  it('should get the purchase cost', () => {
    const data: CraftingIngredientData = { id: 'IngotT2', type: 'Item', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    const materials = new Materials();
    const provision = new Provision(ingredient, materials);

    ingredient.initialize();
    expect(provision.cost).toBe(4);
  });

  it('should get the bonus item chance', () => {
    const data: CraftingIngredientData = { id: 'IngotT2', type: 'Item', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    const materials = new Materials();
    const provision = new Provision(ingredient, materials);

    ingredient.initialize();
    expect(provision.chance).toBe(0);
  });
});
