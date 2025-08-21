import { ApplicationInitStatus, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock, initializeGamingTools } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Category } from './category';

describe('Category', () => {
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

  it('should throw on missing artisan instance', () => {
    expect(() => new Category(null!, null!, null!)).toThrowError('Invalid artisan instance.');
  });

  it('should throw on missing category data', () => {
    expect(() => new Category(service, null!, null!)).toThrowError('Invalid category data.');
  });

  it('should throw on missing items data', () => {
    const data = service.data.categories.get('FluxReagentsT5')!;
    expect(() => new Category(service, data, null!)).toThrowError('Invalid items data.');
  });

  it('should create a regular category', () => {
    const id = 'FluxReagentsT5';
    const data = service.data.categories.get(id)!;
    const items = service.data.ingredients.get(id)!;
    const category = new Category(service, data, items);
    expect(category).toBeTruthy();

    expect(category.id).toBe(id);
    expect(category.name).toBe('@RefiningReagentsT5_GroupName');
    expect(category.entities?.map(x => x.id)).toEqual([
      'SandpaperT5', 'TanninT5', 'SolventT5', 'ClothWeaveT5'
    ]);
  });
});
