import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { getIconPath, NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Entity, getIconInputs } from "./entity";
import { Purchase } from './purchase';

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

  it('should throw on null item', () => {
    expect(() => new Entity(service, null!)).toThrowError('Invalid item data.');
  });

  it('should create an entity', () => {
    const item = service.data.items.get('OreT1')!;
    const entity = new Entity(service, item);
    expect(entity.id).toBe('OreT1');
    expect(entity.name).toBe('@OreT1_MasterName');
    expect(entity.icon).toBe(getIconPath('OreT1'));
    expect(entity.rarity).toBe('common');
    expect(entity.named).toBe(false);
    expect(entity.category).toBe('Resources');
    expect(entity.family).toBe('RawResources');
    expect(entity.type).toBe('Resource');
    expect(entity.tier).toBe(1);
    expect(entity.price()).toBe(0.5);
  });

  it('should request a purchase', () => {
    const item = service.data.items.get('OreT1')!;
    const entity = new Entity(service, item);
    const purchase = entity.request();
    expect(purchase).toBeInstanceOf(Purchase);
    expect(purchase.entity).toBe(entity);
  });

  describe('getIconInputs', () => {
    it('should return icon inputs', () => {
      const item = service.data.items.get('OreT1')!;
      const entity = new Entity(service, item);
      const inputs = getIconInputs(entity);
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
