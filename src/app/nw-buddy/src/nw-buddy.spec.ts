import { provideZonelessChangeDetection } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';

import { NwBuddy } from './nw-buddy';
import { NwBuddyApi } from './nw-buddy-api';

describe('NwBuddy', () => {
  let service: NwBuddy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: NwBuddyApi, useClass: NwBuddyApiMock }
      ]
    });

    service = TestBed.inject(NwBuddy);
    TestBed.tick();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get items', () => {
    const items = service.items.get('oret1');
    expect(items).toBeTruthy();
  });

  it('should get housing items', () => {
    const housingItems = service.housing.get('House_HousingItem_Lighting_CandleHolder_A');
    expect(housingItems).toBeTruthy();
  });

  it('should get recipes', () => {
    const recipes = service.recipes.get('ingott2');
    expect(recipes).toBeTruthy();
  });

  it('should get categories', () => {
    const categories = service.categories.get('FluxReagentsT5');
    expect(categories).toBeTruthy();
  });

  it('should get ingredients', () => {
    const ingredients = service.ingredients.get('AlchemyFire');
    expect(ingredients).toBeTruthy();
  });
});
