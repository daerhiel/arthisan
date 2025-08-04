import { provideZonelessChangeDetection } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Materials } from './materials';
import { Craftable } from './craftable';
import { Assembly } from './assembly';

describe('Craftable', () => {
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

  it('should throw on missing artisan instance', () => {
    expect(() => new Craftable(null!, null!, null!)).toThrowError('Invalid artisan instance.');
  });

  it('should throw on null item', () => {
    expect(() => new Craftable(service, null!, null!)).toThrowError('Invalid item data.');
  });

  it('should throw on null recipes', () => {
    const item = service.data.items.get('OreT1')!;
    expect(() => new Craftable(service, item, null!)).toThrowError('Invalid recipes data.');
  });

  it('should create a craftable entity', () => {
    const item = service.data.items.get('IngotT2')!;
    const recipes = service.data.recipes.get('IngotT2')!;
    const craftable = new Craftable(service, item, recipes);
    expect(craftable.blueprints.map(x => x.entity.id)).toEqual(['IngotT2']);
  });

  it('should request an assembly with default materials', () => {
    const item = service.data.items.get('IngotT2')!;
    const recipes = service.data.recipes.get('IngotT2')!;
    const craftable = new Craftable(service, item, recipes);
    craftable.initialize();

    const assembly = craftable.request();
    expect(assembly).toBeInstanceOf(Assembly);
    expect(assembly.entity).toBe(craftable);
    expect(assembly.materials).toBeInstanceOf(Materials);
  });

  it('should request an assembly', () => {
    const item = service.data.items.get('IngotT2')!;
    const recipes = service.data.recipes.get('IngotT2')!;
    const craftable = new Craftable(service, item, recipes);
    craftable.initialize();

    const materials = new Materials();
    const assembly = craftable.request(materials);
    expect(assembly).toBeInstanceOf(Assembly);
    expect(assembly.entity).toBe(craftable);
    expect(assembly.materials).toBe(materials);
  });
});
