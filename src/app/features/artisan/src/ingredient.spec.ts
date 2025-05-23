import { firstValueFrom, timer } from "rxjs";

import { TestBed } from "@angular/core/testing";
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from "./artisan";
import { Ingredient } from "./ingredient";
import { Craftable } from "./craftable";
import { Category } from "./category";

describe('Ingredient', () => {
  let service: Artisan;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
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
    expect(() => new Ingredient(null!, null!, null!, 0)).toThrowError('Invalid artisan instance.');
  });

  it('should create a non-existing item ingredient', () => {
    const ingredient = new Ingredient(service, 'UnknownId', 'Item', 1);
    expect(ingredient.id).toBe('UnknownId');
    expect(ingredient.type).toBe('Item');
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.source()).toBe(null);
  });

  it('should create a regular item ingredient', () => {
    const ingredient = new Ingredient(service, 'OreT1', 'Item', 1);
    expect(ingredient.id).toBe('OreT1');
    expect(ingredient.type).toBe('Item');
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.source()).toBeInstanceOf(Craftable);
  });

  it('should create a non-existing category ingredient', () => {
    const ingredient = new Ingredient(service, 'UnknownId', 'Category_Only', 1);
    expect(ingredient.id).toBe('UnknownId');
    expect(ingredient.type).toBe('Category_Only');
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.source()).toBe(null);
  });

  it('should create a regular category ingredient', () => {
    const ingredient = new Ingredient(service, 'FluxReagentsT5', 'Category_Only', 1);
    expect(ingredient.id).toBe('FluxReagentsT5');
    expect(ingredient.type).toBe('Category_Only');
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.source()).toBeInstanceOf(Category);
  });
});
