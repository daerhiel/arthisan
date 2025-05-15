import { firstValueFrom, timer } from "rxjs";

import { TestBed } from "@angular/core/testing";
import { getIconPath, NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi, NwI18n } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from "./artisan";
import { Craftable, getIconInputs, getPriceInputs } from "./craftable";

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
    const i18n = TestBed.inject(NwI18n);
    while (i18n.isLoading()) {
      await firstValueFrom(timer(100));
    }
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
    expect(craftable).toBeTruthy();
    expect(craftable.id).toBe('UnknownId');
    expect(craftable.name()).toBe('UnknownId');
    expect(craftable.icon()).toBe(null);
    expect(craftable.rarity()).toBe('common');
    expect(craftable.named()).toBe(false);
    expect(craftable.category()).toBe(null);
    expect(craftable.family()).toBe(null);
    expect(craftable.type()).toBe(null);
    expect(craftable.tier()).toBe(null);
    expect(craftable.price()).toBe(null);
    expect(craftable.blueprints()).toBe(null);
  });

  it('should create a regular item', () => {
    const craftable = new Craftable(service, 'OreT1');
    expect(craftable).toBeTruthy();

    expect(craftable.id).toBe('OreT1');
    expect(craftable.name()).toBe('Iron Ore');
    expect(craftable.icon()).toBe(getIconPath('OreT1'));
    expect(craftable.rarity()).toBe('common');
    expect(craftable.named()).toBe(false);
    expect(craftable.category()).toBe('Resources');
    expect(craftable.family()).toBe('Raw Resources');
    expect(craftable.type()).toBe('Resource');
    expect(craftable.tier()).toBe(1);
    expect(craftable.price()).toBe(0.5);
    expect(craftable.blueprints()).toBe(null);
  });

  it('should create a craftable item', () => {
    const craftable = new Craftable(service, 'IngotT2');
    expect(craftable).toBeTruthy();

    expect(craftable.id).toBe('IngotT2');
    expect(craftable.name()).toBe('Iron Ingot');
    expect(craftable.icon()).toBe(getIconPath('IngotT2'));
    expect(craftable.rarity()).toBe('common');
    expect(craftable.named()).toBe(false);
    expect(craftable.category()).toBe('Resources');
    expect(craftable.family()).toBe('Refined Resources');
    expect(craftable.type()).toBe('Resource');
    expect(craftable.tier()).toBe(2);
    expect(craftable.price()).toBe(4);
    expect(craftable.blueprints()?.map(x => x.item.id)).toEqual(['IngotT2']);
  });

  describe('getIconInputs', () => {
    it('should return icon inputs', () => {
      const craftable = new Craftable(service, 'OreT1');
      const inputs = getIconInputs(craftable);
      expect(inputs).toEqual({
        path: getIconPath('OreT1'),
        name: 'Iron Ore',
        rarity: 'common',
        named: false,
        size: 12
      });
    });
  });

  describe('getPriceInputs', () => {
    it('should return price inputs', () => {
      const craftable = new Craftable(service, 'OreT1');
      const inputs = getPriceInputs(x => x.price())(craftable);
      expect(inputs).toEqual({ value: 0.5 });
    });
  });
});
