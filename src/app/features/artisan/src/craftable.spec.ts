import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Craftable } from './craftable';

describe('Craftable', () => {
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
    expect(() => new Craftable(null!, null!)).toThrowError('Invalid artisan instance.');
  });

  it('should create a non-existing item', () => {
    const craftable = new Craftable(service, 'UnknownId');
    expect(craftable.blueprints()).toBe(null);
  });

  it('should create a regular item', () => {
    const craftable = new Craftable(service, 'OreT1');
    expect(craftable.blueprints()).toBe(null);
  });

  it('should create a craftable item', () => {
    const craftable = new Craftable(service, 'IngotT2');
    expect(craftable.blueprints()?.map(x => x.item.id)).toEqual(['IngotT2']);
  });
});
