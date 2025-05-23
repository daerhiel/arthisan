import { firstValueFrom, timer } from "rxjs";

import { TestBed } from "@angular/core/testing";
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from "./artisan";
import { Category } from "./category";

describe('Category', () => {
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
    expect(() => new Category(null!, null!)).toThrowError('Invalid artisan instance.');
  });

  it('should create a non-existing category', () => {
    const category = new Category(service, 'UnknownId');
    expect(category).toBeTruthy();
    expect(category.id).toBe('UnknownId');
    expect(category.name()).toBe(null);
    expect(category.items()).toBe(null);
  });

  it('should create a regular category', () => {
    const category = new Category(service, 'FluxReagentsT5');
    expect(category).toBeTruthy();

    expect(category.id).toBe('FluxReagentsT5');
    expect(category.name()).toBe('@RefiningReagentsT5_GroupName');
    expect(category.items()?.map(x => x.id)).toEqual([
      'SandpaperT5', 'TanninT5', 'SolventT5', 'ClothWeaveT5'
    ]);
  });
});
