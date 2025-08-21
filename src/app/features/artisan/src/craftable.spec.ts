import { ApplicationInitStatus, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock, initializeGamingTools } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Materials } from './materials';
import { Craftable } from './craftable';
import { Assembly } from './assembly';

describe('Craftable', () => {
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
