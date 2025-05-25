import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Projection } from './projection';

describe('Projection', () => {
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

  it('should create for existing blueprint', () => {
    const craftable = service.getItem('IngotT2')!;
    const [blueprint] = craftable.blueprints() ?? [];
    const projection = new Projection(blueprint);
    expect(projection).toBeTruthy();
    expect(projection.blueprint).toBe(blueprint);
    expect(projection.provisions.map(x => x.ingredient)).toEqual(blueprint.ingredients);
  });

  it('should throw on missing blueprint', () => {
    expect(() => new Projection(null!)).toThrowError(/invalid blueprint instance/i);
  });
});
