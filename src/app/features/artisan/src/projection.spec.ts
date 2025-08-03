import { provideZonelessChangeDetection } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Materials } from './materials';
import { Projection } from './projection';

describe('Projection', () => {
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

  it('should throw on missing blueprint', () => {
    expect(() => new Projection(null!, null!)).toThrowError(/invalid blueprint instance/i);
  });

  it('should throw on missing materials', () => {
    const craftable = service.getCraftable('IngotT2');
    const [blueprint] = craftable.blueprints;
    expect(() => new Projection(blueprint, null!)).toThrowError(/invalid materials instance/i);
  });

  it('should create for existing blueprint', () => {
    const craftable = service.getCraftable('IngotT2');
    const [blueprint] = craftable.blueprints;
    const materials = new Materials();
    const projection = new Projection(blueprint, materials);
    expect(projection).toBeTruthy();
    expect(projection.blueprint).toBe(blueprint);
    expect(projection.provisions.map(x => x.ingredient)).toEqual(blueprint.ingredients);
    expect(projection.materials).toBe(materials);
  });

  it('should get the projection crafting chance', () => {
    const craftable = service.getCraftable('IngotT2');
    const [blueprint] = craftable.blueprints;
    const materials = new Materials();
    const projection = new Projection(blueprint, materials);

    expect(projection.chance).toBe(0.3);
  });

  it('should get the projection cost', () => {
    const craftable = service.getCraftable('IngotT2');
    const [blueprint] = craftable.blueprints;
    const materials = new Materials();
    const projection = new Projection(blueprint, materials);

    expect(projection.cost).toBe(2);
  });

  it('should get the projection effective value', () => {
    const craftable = service.getCraftable('IngotT2');
    const [blueprint] = craftable.blueprints;
    const materials = new Materials();
    const projection = new Projection(blueprint, materials);

    expect(projection.value).toBe(2);
  });

  it('should get the projection crafting profit', () => {
    const craftable = service.getCraftable('IngotT2');
    const [blueprint] = craftable.blueprints;
    const materials = new Materials();
    const projection = new Projection(blueprint, materials);

    expect(projection.profit).toBe(2);
  });
});
