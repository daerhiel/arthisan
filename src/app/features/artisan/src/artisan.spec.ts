import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';

describe('Artisan', () => {
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get craftable item', () => {
    const itemId = 'IngotT2';
    const craftable = service.getItem(itemId);
    expect(craftable).toBeTruthy();
    expect(craftable?.id).toBe(itemId);
  });

  it('should get null for non-existing item', () => {
    const itemId = 'NonExistingItem';
    const craftable = service.getItem(itemId);
    expect(craftable).toBeNull();
  });

  it('should get category', () => {
    const categoryId = 'FluxReagentsT5';
    const category = service.getCategory(categoryId);
    expect(category).toBeTruthy();
    expect(category?.id).toBe(categoryId);
  });

  it('should get null for non-existing category', () => {
    const categoryId = 'NonExistingCategory';
    const category = service.getCategory(categoryId);
    expect(category).toBeNull();
  });

  it('should get craftable ingredient', () => {
    const ingredientId = 'OreT1';
    const ingredient = service.getIngredient(ingredientId, 'Item');
    expect(ingredient).toBeTruthy();
    expect(ingredient?.id).toBe(ingredientId);
  });

  it('should get null for non-existing craftable ingredient', () => {
    const ingredientId = 'NonExistingIngredient';
    const ingredient = service.getIngredient(ingredientId, 'Item');
    expect(ingredient).toBeNull();
  });

  it('should get category ingredient', () => {
    const categoryId = 'FluxReagentsT5';
    const ingredient = service.getIngredient(categoryId, 'Category_Only');
    expect(ingredient).toBeTruthy();
    expect(ingredient?.id).toBe(categoryId);
  });

  it('should get null for non-existing category ingredient', () => {
    const categoryId = 'NonExistingCategory';
    const ingredient = service.getIngredient(categoryId, 'Category_Only');
    expect(ingredient).toBeNull();
  });

  it('should throw error for unsupported ingredient type', () => {
    const type = 'Currency';
    expect(() => service.getIngredient('OreT1', type)).toThrowError(/ingredient type is not supported/i);
  });
});
