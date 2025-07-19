import { provideZonelessChangeDetection } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { getDatasheetIds, NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { CraftingIngredientType, CraftingTradeskill, DATASHEETS } from '@app/nw-data';
import { NwBuddyApi } from '@app/nw-buddy';
import { GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Equipment } from './equipment';
import { Entity } from './entity';
import { Craftable } from './craftable';

describe('Artisan', () => {
  let service: Artisan;

  beforeEach(() => {
    spyOn(console, 'warn');
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: NwBuddyApi, useClass: NwBuddyApiMock },
        { provide: GamingToolsApi, useClass: GamingToolsApiMock }
      ]
    });
    service = TestBed.inject(Artisan);
    TestBed.flushEffects();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get an entity', () => {
    const itemId = 'OreT1';
    const entity = service.getEntity(itemId);
    expect(entity).toBeTruthy();
    expect(entity).toBeInstanceOf(Entity);
    expect(entity?.id).toBe(itemId);
  });

  it('should get a entity', () => {
    const itemId = 'IngotT2';
    const craftable = service.getEntity(itemId);
    expect(craftable).toBeTruthy();
    expect(craftable).toBeInstanceOf(Craftable);
    expect(craftable?.id).toBe(itemId);
  });

  it('should get recursive entity', () => {
    const itemId = 'RubyT2';
    const craftable = service.getEntity(itemId);
    expect(craftable).toBeTruthy();
    expect(craftable).toBeInstanceOf(Craftable);
    expect(craftable?.id).toBe(itemId);
  });

  it('should get a housing item entity', () => {
    const itemId = 'House_HousingItem_Lighting_CandleHolder_A';
    const craftable = service.getEntity(itemId);
    expect(craftable).toBeTruthy();
    expect(craftable).toBeInstanceOf(Craftable);
    expect(craftable?.id).toBe(itemId);
  });

  it('should throw error for non-existing entity', () => {
    const itemId = 'NonExistingItem';
    expect(() => service.getEntity(itemId)).toThrowError(`Master item is not found: ${itemId}.`);
  });

  it('should get craftable entity', () => {
    const itemId = 'IngotT2';
    const craftable = service.getCraftable(itemId);
    expect(craftable).toBeTruthy();
    expect(craftable).toBeInstanceOf(Craftable);
    expect(craftable?.id).toBe(itemId);
  });

  it('should get recursive craftable entity', () => {
    const itemId = 'RubyT2';
    const craftable = service.getCraftable(itemId);
    expect(craftable).toBeTruthy();
    expect(craftable).toBeInstanceOf(Craftable);
    expect(craftable?.id).toBe(itemId);
  });

  it('should get a housing item craftable entity', () => {
    const itemId = 'House_HousingItem_Lighting_CandleHolder_A';
    const craftable = service.getCraftable(itemId);
    expect(craftable).toBeTruthy();
    expect(craftable).toBeInstanceOf(Craftable);
    expect(craftable?.id).toBe(itemId);
  });

  it('should throw error for non-existing craftable entity', () => {
    const itemId = 'NonExistingItem';
    expect(() => service.getCraftable(itemId)).toThrowError(`Master item is not found: ${itemId}.`);
  });

  it('should throw error for non-craftable entity', () => {
    const itemId = 'OreT1';
    expect(() => service.getCraftable(itemId)).toThrowError(`Recipes are not found: ${itemId}.`);
  });

  it('should get category', () => {
    const categoryId = 'FluxReagentsT5';
    const category = service.getCategory(categoryId);
    expect(category).toBeTruthy();
    expect(category?.id).toBe(categoryId);
  });

  it('should throw error for non-existing category', () => {
    const categoryId = 'NonExistingCategory';
    expect(() => service.getCategory(categoryId)).toThrowError(`Crafting category is not found: ${categoryId}.`);
  });

  it('should throw error for missing category items', () => {
    const categoryId = 'Utilities';
    expect(() => service.getCategory(categoryId)).toThrowError(`Category items are not found: ${categoryId}.`);
  });

  it('should get craftable ingredient', () => {
    const ingredientId = 'OreT1';
    const ingredient = service.getIngredient(ingredientId, 'Item');
    expect(ingredient).toBeTruthy();
    expect(ingredient?.id).toBe(ingredientId);
  });

  it('should get category ingredient', () => {
    const categoryId = 'FluxReagentsT5';
    const ingredient = service.getIngredient(categoryId, 'Category_Only');
    expect(ingredient).toBeTruthy();
    expect(ingredient?.id).toBe(categoryId);
  });

  it('should get known currency ingredient', () => {
    const currencyId = 'Azoth_Currency';
    const ingredient = service.getIngredient(currencyId, 'Currency');
    expect(ingredient).toBeTruthy();
    expect(ingredient?.id).toBe('AzureT1');
  });

  it('should get unknown currency ingredient', () => {
    const currencyId = 'Unknown_Currency';
    const ingredient = service.getIngredient(currencyId, 'Currency');
    expect(ingredient).toBeTruthy();
    expect(ingredient?.id).toBe('AzureT1');
    expect(console.warn).toHaveBeenCalledWith(`Currency: ${currencyId}.`);
  });

  it('should throw error for unsupported ingredient type', () => {
    const type = 'Unsupported' as CraftingIngredientType;
    expect(() => service.getIngredient('OreT1', type)).toThrowError(/ingredient type is not supported/i);
  });

  it('should get equipment context', () => {
    const tradeskill = 'Jewelcrafting';
    const equipment = service.getContext(tradeskill);
    expect(equipment).toBeInstanceOf(Equipment);
  });

  it('should return null for non-existing tradeskill', () => {
    const tradeskill = 'Unknown';
    const equipment = service.getContext(tradeskill as CraftingTradeskill);
    expect(equipment).toBeNull();
  });
});

describe('Artisan: no data', () => {
  let service: Artisan;
  let apiMock: NwBuddyApiMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: NwBuddyApi, useClass: NwBuddyApiMock },
        { provide: GamingToolsApi, useClass: GamingToolsApiMock }
      ]
    });
    const api = TestBed.inject(NwBuddyApi);
    if (api instanceof NwBuddyApiMock) {
      apiMock = api;
      apiMock.defer(true);
    }
    service = TestBed.inject(Artisan);
  });

  it('should throw when getting entity with unloaded data', () => {
    expect(() => service.getEntity('OreT1')).toThrowError(/items data are not loaded yet/i);
  });

  it('should throw when getting entity with unloaded housing data', () => {
    apiMock.complete(...getDatasheetIds(DATASHEETS.MasterItemDefinitions));
    expect(() => service.getEntity('OreT1')).toThrowError(/housing data are not loaded yet/i);
  });

  it('should throw when getting entity with unloaded recipe data', () => {
    apiMock.complete(...getDatasheetIds(DATASHEETS.MasterItemDefinitions));
    apiMock.complete(...getDatasheetIds(DATASHEETS.HouseItems));
    expect(() => service.getEntity('IngotT2')).toThrowError(/recipes data are not loaded yet/i);
  });

  it('should throw when getting craftable entity with unloaded data', () => {
    expect(() => service.getCraftable('IngotT2')).toThrowError(/items data are not loaded yet/i);
  });

  it('should throw when getting craftable entity with unloaded housing data', () => {
    apiMock.complete(...getDatasheetIds(DATASHEETS.MasterItemDefinitions));
    expect(() => service.getCraftable('IngotT2')).toThrowError(/housing data are not loaded yet/i);
  });

  it('should throw when getting craftable entity with unloaded recipe data', () => {
    apiMock.complete(...getDatasheetIds(DATASHEETS.MasterItemDefinitions));
    apiMock.complete(...getDatasheetIds(DATASHEETS.HouseItems));
    expect(() => service.getCraftable('IngotT2')).toThrowError(/recipes data are not loaded yet/i);
  });

  it('should throw when getting category with unloaded data', () => {
    expect(() => service.getCategory('FluxReagentsT5')).toThrowError(/categories data are not loaded yet/i);
  });

  it('should throw when getting category with unloaded ingredient data', () => {
    apiMock.complete(...getDatasheetIds(DATASHEETS.CraftingCategoryData));
    expect(() => service.getCategory('FluxReagentsT5')).toThrowError(/ingredients data are not loaded yet/i);
  });
});
