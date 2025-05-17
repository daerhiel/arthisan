import { firstValueFrom, timer } from "rxjs";

import { TestBed } from "@angular/core/testing";
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi, NwI18n } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from "./artisan";
import { Ingredient } from "./ingredient";

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
    const i18n = TestBed.inject(NwI18n);
    while (i18n.isLoading()) {
      await firstValueFrom(timer(100));
    }
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
    expect(ingredient).toBeTruthy();
    expect(ingredient.id).toBe('UnknownId');
    expect(ingredient.type).toBe('Item');
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.item()).toBe(null);
  });

  it('should create a regular item ingredient', () => {
    const ingredient = new Ingredient(service, 'OreT1', 'Item', 1);
    expect(ingredient).toBeTruthy();

    expect(ingredient.id).toBe('OreT1');
    expect(ingredient.type).toBe('Item');
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.item()?.id).toBe('OreT1');
  });

  it('should create a non-existing category ingredient', () => {
    const ingredient = new Ingredient(service, 'UnknownId', 'Category_Only', 1);
    expect(ingredient).toBeTruthy();
    expect(ingredient.id).toBe('UnknownId');
    expect(ingredient.type).toBe('Category_Only');
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.item()).toBeNull();
  });

  it('should create a regular category ingredient', () => {
    const ingredient = new Ingredient(service, 'FluxReagentsT5', 'Category_Only', 1);
    expect(ingredient).toBeTruthy();
    expect(ingredient.id).toBe('FluxReagentsT5');
    expect(ingredient.type).toBe('Category_Only');
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.item()).toBeNull();
  });

  it('should select an item in category ingredient', () => {
    const ingredient = new Ingredient(service, 'FluxReagentsT5', 'Category_Only', 1);
    ingredient.selected.set('TanninT5');
    expect(ingredient).toBeTruthy();
    expect(ingredient.id).toBe('FluxReagentsT5');
    expect(ingredient.type).toBe('Category_Only');
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.item()?.id).toBe('TanninT5');
  });

  it('should auto select cheapest item', () => {
    const ingredient = new Ingredient(service, 'FluxReagentsT5', 'Category_Only', 1);
    ingredient.automatic.set(true);
    expect(ingredient).toBeTruthy();
    expect(ingredient.id).toBe('FluxReagentsT5');
    expect(ingredient.type).toBe('Category_Only');
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.item()?.id).toBe('SolventT5');
  });
});
