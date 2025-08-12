import { provideZonelessChangeDetection } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { GetterFn } from '@app/core';
import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Materials } from './materials';
import { Production } from './production';
import { Purchase } from './purchase';

interface IndexValue<T> {
  id: string;
  value: T;
}

type IndexValueFn<T> = (id: string) => IndexValue<T>;

function extract<T>(materials: Materials, selector: GetterFn<Purchase, T>): IndexValueFn<T | null>  {
  return (id: string) => {
    const object = materials.get(id);
    return { id, value: object ? selector(object) : null };
  };
}

describe('Production', () => {
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

  it('should create for existing craftable entity', () => {
    const craftable = service.getCraftable('IngotT2');
    const production = new Production(craftable);
    expect(production).toBeTruthy();
    expect(production.entity).toBe(craftable);
    expect(production.projections.map(x => x.blueprint) ?? null).toEqual(craftable.blueprints);
    expect(production.materials).toBeInstanceOf(Materials);
  });

  it('should throw for non-existing craftable entity', () => {
    expect(() => new Production(null!)).toThrowError(/invalid entity instance/i);
  });

  it('should have default requested value', () => {
    const craftable = service.getCraftable('IngotT2');
    const production = new Production(craftable);
    expect(production.requested()).toBe(1);
  });

  it('should compute requested volume', () => {
    const craftable = service.getCraftable('IngotT2');
    const materials = new Materials();
    const production = new Production(craftable, materials);
    production.crafted.set(true);
    production.requested.set(3);
    expect(materials.ids.map(extract(materials, x => x.requested()))).toEqual([
      { id: 'IngotT2', value: 3 },
      { id: 'OreT1', value: 8 }
    ]);
    expect(materials.ids.map(extract(materials, x => x.cost))).toEqual([
      { id: 'IngotT2', value: 12 },
      { id: 'OreT1', value: 4 }
    ]);
  });
});
