import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { getIconPath, NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Entity, getIconInputs } from "./entity";

describe('Entity', () => {
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
    expect(() => new Entity(null!, null!)).toThrowError('Invalid artisan instance.');
  });

  it('should create a non-existing item', () => {
    const entity = new Entity(service, 'UnknownId');
    expect(entity.id).toBe('UnknownId');
    expect(entity.name()).toBe(null);
    expect(entity.icon()).toBe(null);
    expect(entity.rarity()).toBe('common');
    expect(entity.named()).toBe(false);
    expect(entity.category()).toBe(null);
    expect(entity.family()).toBe(null);
    expect(entity.type()).toBe(null);
    expect(entity.tier()).toBe(null);
    expect(entity.price()).toBe(null);
  });

  it('should create a regular item', () => {
    const entity = new Entity(service, 'OreT1');
    expect(entity.id).toBe('OreT1');
    expect(entity.name()).toBe('@OreT1_MasterName');
    expect(entity.icon()).toBe(getIconPath('OreT1'));
    expect(entity.rarity()).toBe('common');
    expect(entity.named()).toBe(false);
    expect(entity.category()).toBe('Resources');
    expect(entity.family()).toBe('RawResources');
    expect(entity.type()).toBe('Resource');
    expect(entity.tier()).toBe(1);
    expect(entity.price()).toBe(0.5);
  });

  it('should create an entity item', () => {
    const entity = new Entity(service, 'IngotT2');
    expect(entity.id).toBe('IngotT2');
    expect(entity.name()).toBe('@IngotT2_MasterName');
    expect(entity.icon()).toBe(getIconPath('IngotT2'));
    expect(entity.rarity()).toBe('common');
    expect(entity.named()).toBe(false);
    expect(entity.category()).toBe('Resources');
    expect(entity.family()).toBe('RefinedResources');
    expect(entity.type()).toBe('Resource');
    expect(entity.tier()).toBe(2);
    expect(entity.price()).toBe(4);
  });

  describe('getIconInputs', () => {
    it('should return icon inputs', () => {
      const craftable = new Entity(service, 'OreT1');
      const inputs = getIconInputs(craftable);
      expect(inputs).toEqual({
        path: getIconPath('OreT1'),
        name: '@OreT1_MasterName',
        rarity: 'common',
        named: false,
        size: 12
      });
    });
  });
});
