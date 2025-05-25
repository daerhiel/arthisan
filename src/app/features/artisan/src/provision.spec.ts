import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Ingredient } from './ingredient';
import { Provision } from './provision';

describe('Provision', () => {
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

  it('should create for existing ingredient', () => {
    const ingredient = new Ingredient(service, 'OreT1', 'Item', 1);
    const material = new Provision(ingredient);
    expect(material).toBeTruthy();
    expect(material.ingredient).toBe(ingredient);
  });

  it('should throw for non-existing ingredient', () => {
    expect(() => new Provision(null!)).toThrowError(/invalid ingredient instance/i);
  });

  it('should create a non-existing item ingredient', () => {
    const ingredient = new Ingredient(service, 'UnknownId', 'Item', 1);
    const material = new Provision(ingredient);
    expect(material.item()).toBe(null);
  });

  it('should create a regular item ingredient', () => {
    const ingredient = new Ingredient(service, 'OreT1', 'Item', 1);
    const material = new Provision(ingredient);
    expect(material.item()?.id).toBe('OreT1');
  });

  it('should create a non-existing category ingredient', () => {
    const ingredient = new Ingredient(service, 'UnknownId', 'Category_Only', 1);
    const material = new Provision(ingredient);
    expect(material.item()).toBeNull();
  });

  it('should create a regular category ingredient', () => {
    const ingredient = new Ingredient(service, 'FluxReagentsT5', 'Category_Only', 1);
    const material = new Provision(ingredient);
    expect(material.item()).toBeNull();
  });

  it('should select an item in category ingredient', () => {
    const ingredient = new Ingredient(service, 'FluxReagentsT5', 'Category_Only', 1);
    const material = new Provision(ingredient);
    material.selected.set('TanninT5');
    expect(material.item()?.id).toBe('TanninT5');
  });

  it('should auto select cheapest item', () => {
    const ingredient = new Ingredient(service, 'FluxReagentsT5', 'Category_Only', 1);
    const material = new Provision(ingredient);
    material.automatic.set(true);
    expect(material.item()?.id).toBe('SolventT5');
  });
});
