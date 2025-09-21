import { ApplicationInitStatus, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock, initializeGamingTools } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Materials } from './materials';
import { Assembly } from './assembly';
import { Projection } from './projection';

describe('Projection', () => {
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

  it('should throw on missing blueprint', () => {
    expect(() => new Projection(null!, null!, null!)).toThrowError(/invalid assembly instance/i);
  });

  it('should throw on missing blueprint', () => {
    const assembly = jasmine.createSpyObj<Assembly>('Assembly', ['entity']);
    expect(() => new Projection(assembly, null!, null!)).toThrowError(/invalid blueprint instance/i);
  });

  it('should throw on missing materials', () => {
    const assembly = jasmine.createSpyObj<Assembly>('Assembly', ['entity']);
    const craftable = service.getCraftable('IngotT2');
    const [blueprint] = craftable.blueprints;
    expect(() => new Projection(assembly, blueprint, null!)).toThrowError(/invalid materials instance/i);
  });

  it('should create for existing blueprint', () => {
    const assembly = jasmine.createSpyObj<Assembly>('Assembly', ['entity']);
    const craftable = service.getCraftable('IngotT2');
    const [blueprint] = craftable.blueprints;

    const materials = new Materials();
    const projection = new Projection(assembly, blueprint, materials);
    expect(projection.assembly).toBe(assembly);
    expect(projection.blueprint).toBe(blueprint);
    expect(projection.provisions.map(x => x.ingredient)).toEqual(blueprint.ingredients);
    expect(projection.materials).toBe(materials);
  });

  it('should get crafting chance', () => {
    const assembly = jasmine.createSpyObj<Assembly>('Assembly', ['entity']);
    const craftable = service.getCraftable('IngotT2');
    const [blueprint] = craftable.blueprints;

    const materials = new Materials();
    const projection = new Projection(assembly, blueprint, materials);
    expect(projection.yieldBonusChance).toBeCloseTo(0.4, 5);
  });

  it('should get crafting cost', () => {
    const assembly = jasmine.createSpyObj<Assembly>('Assembly', { boosted: true, requested: 4 });
    const craftable = service.getCraftable('IngotT2');
    const [blueprint] = craftable.blueprints;

    const materials = new Materials();
    const projection = new Projection(assembly, blueprint, materials);
    expect(projection.cost).toBe(1);
  });

  it('should get effective volume', () => {
    const assembly = jasmine.createSpyObj<Assembly>('Assembly', { boosted: true, requested: 4 });
    const craftable = service.getCraftable('IngotT2');
    const [blueprint] = craftable.blueprints;

    const materials = new Materials();
    const projection = new Projection(assembly, blueprint, materials);
    expect(projection.effective).toBe(2);
  });

  it('should get crafting margin', () => {
    const assembly = jasmine.createSpyObj<Assembly>('Assembly', { boosted: true, requested: 1 });
    const craftable = service.getCraftable('IngotT2');
    const [blueprint] = craftable.blueprints;

    const materials = new Materials();
    const projection = new Projection(assembly, blueprint, materials);
    expect(projection.margin).toBe(2);
  });

  it('should get crafting profit', () => {
    const assembly = jasmine.createSpyObj<Assembly>('Assembly', { crafted: true, boosted: true, requested: 1 });
    const craftable = service.getCraftable('IngotT2');
    const [blueprint] = craftable.blueprints;

    const materials = new Materials();
    const projection = new Projection(assembly, blueprint, materials);
    expect(projection.profit).toBe(2);
  });
});
