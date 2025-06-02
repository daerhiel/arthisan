import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Ingredient } from './ingredient';

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

  it('should throw on missing entity instance', () => {
    expect(() => new Ingredient(null!, 0)).toThrowError(/invalid entity or category/i);
  });

  it('should throw on invalid quantity', () => {
    const entity = service.getEntity('OreT1');
    expect(() => new Ingredient(entity, 0)).toThrowError(/quantity must be greater than zero/i);
  });

  it('should create a regular entity ingredient', () => {
    const entity = service.getEntity('OreT1');
    const ingredient = new Ingredient(entity, 1);
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.entity).toBe(entity);
  });

  it('should create a regular craftable ingredient', () => {
    const entity = service.getCraftable('IngotT2');
    const ingredient = new Ingredient(entity, 1);
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.entity).toBe(entity);
  });

  it('should create a regular category ingredient', () => {
    const category = service.getCategory('FluxReagentsT5');
    const ingredient = new Ingredient(category, 1);
    expect(ingredient.quantity).toBe(1);
    expect(ingredient.entity).toBe(category);
  });
});
