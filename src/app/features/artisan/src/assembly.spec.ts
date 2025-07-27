import { provideZonelessChangeDetection } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Materials } from './materials';
import { Assembly } from './assembly';

describe('Assembly', () => {
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

  // it('should throw for existing entity', () => {
  //   const craftable = service.getEntity('OreT1') as Craftable;
  //   expect(() => new Assembly(craftable)).toThrowError(/invalid craftable instance/i);
  // });

  it('should create for existing craftable', () => {
    const craftable = service.getCraftable('IngotT2');
    const assembly = new Assembly(craftable);
    expect(assembly).toBeTruthy();
    expect(assembly.entity).toBe(craftable);
    expect(assembly.projections.map(x => x.blueprint) ?? null).toEqual(craftable.blueprints);
    expect(assembly.materials).toBeInstanceOf(Materials);
  });

  it('should throw for non-existing craftable', () => {
    expect(() => new Assembly(null!)).toThrowError(/invalid entity instance/i);
  });
});
