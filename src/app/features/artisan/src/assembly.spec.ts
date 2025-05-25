import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Assembly } from './assembly';

describe('Assembly', () => {
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

  it('should create for existing resource', () => {
    const craftable = service.getItem('OreT1')!;
    const assembly = new Assembly(craftable);
    expect(assembly).toBeTruthy();
    expect(assembly.item).toBe(craftable);
    expect(assembly.projects()?.map(x => x.blueprint) ?? null).toEqual(craftable.blueprints());
  });

  it('should create for existing craftable', () => {
    const craftable = service.getItem('IngotT2')!;
    const assembly = new Assembly(craftable);
    expect(assembly).toBeTruthy();
    expect(assembly.item).toBe(craftable);
    expect(assembly.projects()?.map(x => x.blueprint) ?? null).toEqual(craftable.blueprints());
  });

  it('should throw for non-existing craftable', () => {
    expect(() => new Assembly(null!)).toThrowError(/invalid craftable instance/i);
  });
});
