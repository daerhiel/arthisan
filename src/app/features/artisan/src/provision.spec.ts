import { ApplicationInitStatus, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock, initializeGamingTools } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { CraftingIngredientData, Ingredient } from './ingredient';
import { Materials } from './materials';
import { Projection } from './projection';
import { Provision } from './provision';

describe('Provision', () => {
  let service: Artisan;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideAppInitializer(initializeGamingTools),
        { provide: NwBuddyApi, useClass: NwBuddyApiMock },
        { provide: GamingToolsApi, useClass: GamingToolsApiMock }
      ]
    });

    service = TestBed.inject(Artisan);
  });

  beforeEach(async () => {
    await TestBed.inject(ApplicationInitStatus).donePromise;
  });

  it('should throw for non-existing projection', () => {
    expect(() => new Provision(null!, null!, null!)).toThrowError(/invalid projection instance/i);
  });

  it('should throw for non-existing ingredient', () => {
    const projection = jasmine.createSpyObj<Projection>('Projection', ['blueprint']);
    expect(() => new Provision(projection, null!, null!)).toThrowError(/invalid ingredient instance/i);
  });

  it('should throw for non-existing materials', () => {
    const projection = jasmine.createSpyObj<Projection>('Projection', ['blueprint']);
    const data: CraftingIngredientData = { id: 'OreT1', type: 'Item', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    expect(() => new Provision(projection, ingredient, null!)).toThrowError(/invalid materials instance/i);
  });

  it('should create an entity provision', () => {
    const projection = jasmine.createSpyObj<Projection>('Projection', ['blueprint']);
    const data: CraftingIngredientData = { id: 'OreT1', type: 'Item', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    ingredient.initialize();

    const materials = new Materials();
    const provision = new Provision(projection, ingredient, materials);
    expect(provision.projection).toBe(projection);
    expect(provision.ingredient).toBe(ingredient);
    expect(provision.purchase?.entity.id).toBe('OreT1');
  });

  it('should create a craftable entity provision', () => {
    const projection = jasmine.createSpyObj<Projection>('Projection', ['blueprint']);
    const data: CraftingIngredientData = { id: 'IngotT2', type: 'Item', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    ingredient.initialize();

    const materials = new Materials();
    const provision = new Provision(projection, ingredient, materials);
    expect(provision.projection).toBe(projection);
    expect(provision.ingredient).toBe(ingredient);
    expect(provision.materials).toBe(materials);
    expect(provision.purchase?.entity.id).toBe('IngotT2');
  });

  it('should create a category provision', () => {
    const projection = jasmine.createSpyObj<Projection>('Projection', ['blueprint']);
    const data: CraftingIngredientData = { id: 'FluxReagentsT5', type: 'Category_Only', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    ingredient.initialize();

    const materials = new Materials();
    const provision = new Provision(projection, ingredient, materials);
    expect(provision.projection).toBe(projection);
    expect(provision.ingredient).toBe(ingredient);
    expect(provision.materials).toBe(materials);
    expect(provision.purchase?.entity.id).toBe('SandpaperT5');
  });

  it('should select an item in category provision', () => {
    const projection = jasmine.createSpyObj<Projection>('Projection', ['blueprint']);
    const data: CraftingIngredientData = { id: 'FluxReagentsT5', type: 'Category_Only', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    ingredient.initialize();

    const materials = new Materials();
    const provision = new Provision(projection, ingredient, materials);

    provision.selected.set('TanninT5');
    expect(provision.purchase?.entity.id).toBe('TanninT5');
  });

  it('should auto select cheapest entity in category provision', () => {
    const projection = jasmine.createSpyObj<Projection>('Projection', ['blueprint']);
    const data: CraftingIngredientData = { id: 'FluxReagentsT5', type: 'Category_Only', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    ingredient.initialize();

    const materials = new Materials();
    const provision = new Provision(projection, ingredient, materials);


    provision.automatic.set(true);
    expect(provision.purchase?.entity.id).toBe('SolventT5');
  });

  it('should get the purchase total', () => {
    const projection = jasmine.createSpyObj<Projection>('Projection', {}, { yield: 1 });
    const data: CraftingIngredientData = { id: 'OreT1', type: 'Item', quantity: 4 };
    const ingredient = new Ingredient(service, data);
    ingredient.initialize();

    const materials = new Materials();
    const provision = new Provision(projection, ingredient, materials);
    expect(provision.total).toBe(2);
  });

  it('should get the bonus item chance', () => {
    const projection = jasmine.createSpyObj<Projection>('Projection', ['blueprint']);
    const data: CraftingIngredientData = { id: 'IngotT2', type: 'Item', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    ingredient.initialize();

    const materials = new Materials();
    const provision = new Provision(projection, ingredient, materials);
    expect(provision.bonus).toBe(0);
  });
});
