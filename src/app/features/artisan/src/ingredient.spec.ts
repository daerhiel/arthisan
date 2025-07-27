import { provideZonelessChangeDetection } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { CraftingIngredientData, Ingredient } from './ingredient';
import { Entity } from './entity';
import { Materials } from './materials';
import { Craftable } from './craftable';
import { Provision } from './provision';
import { Category } from './category';

describe('Ingredient', () => {
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

  it('should throw on missing artisan instance', () => {
    expect(() => new Ingredient(null!, null!)).toThrowError(/invalid artisan instance/i);
  });

  it('should throw on missing ingredient data', () => {
    expect(() => new Ingredient(service, null!)).toThrowError(/invalid ingredient data/i);
  });

  it('should throw on invalid quantity', () => {
    const data: CraftingIngredientData = { id: 'OreT1', type: 'Item', quantity: 0 };
    expect(() => new Ingredient(service, data)).toThrowError(/quantity must be greater than zero/i);
  });

  it('should create an entity ingredient', () => {
    const data: CraftingIngredientData = { id: 'OreT1', type: 'Item', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    expect(ingredient.source).toEqual(data);
    expect(ingredient.id).toBe('OreT1');
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.entity).toBeFalsy();
  });

  it('should initialize an entity ingredient', () => {
    const data: CraftingIngredientData = { id: 'OreT1', type: 'Item', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    ingredient.initialize();
    expect(ingredient.entity).toBeInstanceOf(Entity);
    expect(ingredient.entity.id).toBe('OreT1');
  });

  it('should create a craftable entity ingredient', () => {
    const data: CraftingIngredientData = { id: 'IngotT2', type: 'Item', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    expect(ingredient.source).toEqual(data);
    expect(ingredient.id).toBe('IngotT2');
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.entity).toBeFalsy();
  });

  it('should initialize a craftable entity ingredient', () => {
    const data: CraftingIngredientData = { id: 'IngotT2', type: 'Item', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    ingredient.initialize();
    expect(ingredient.entity).toBeInstanceOf(Craftable);
    expect(ingredient.entity.id).toBe('IngotT2');
  });

  it('should create a regular category ingredient', () => {
    const data: CraftingIngredientData = { id: 'FluxReagentsT5', type: 'Category_Only', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    expect(ingredient.source).toEqual(data);
    expect(ingredient.id).toBe('FluxReagentsT5');
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.entity).toBeFalsy();
  });

  it('should initialize a regular category ingredient', () => {
    const data: CraftingIngredientData = { id: 'FluxReagentsT5', type: 'Category_Only', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    ingredient.initialize();
    expect(ingredient.entity).toBeInstanceOf(Category);
    expect(ingredient.entity.id).toBe('FluxReagentsT5');
  });

  it('should request a provision', () => {
    const data: CraftingIngredientData = { id: 'OreT1', type: 'Item', quantity: 1 };
    const ingredient = new Ingredient(service, data);
    const materials = new Materials();
    const provision = ingredient.request(materials);
    expect(provision).toBeInstanceOf(Provision);
    expect(provision.ingredient).toBe(ingredient);
    expect(provision.materials).toBe(materials);
  });
});
