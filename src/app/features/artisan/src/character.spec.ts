import { ApplicationInitStatus, provideAppInitializer, provideZonelessChangeDetection, Signal } from "@angular/core";
import { TestBed } from "@angular/core/testing";

import { GamingToolsApiMock, initializeGamingTools } from "@app/gaming-tools/testing";
import { NwBuddyApiMock } from "@app/nw-buddy/testing";

import { GamingToolsApi } from "@app/gaming-tools";
import { NwBuddy, NwBuddyApi } from "@app/nw-buddy";
import { Character } from "./character";
import { Artisan } from "./artisan";

function extract(object: Record<string, number>, [key, value]: [string, Signal<number>]): Record<string, number> {
  object[key] = value();
  return object;
}

describe('Character', () => {
  let service: Artisan;
  let buddy: NwBuddy;

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
    buddy = TestBed.inject(NwBuddy);
  });

  beforeEach(async () => {
    await TestBed.inject(ApplicationInitStatus).donePromise;
  });

  it('should throw on missing nw buddy instance', () => {
    expect(() => new Character(null!)).toThrowError(/invalid nw buddy instance/i);
  });

  it('should create', () => {
    const character = new Character(buddy);
    expect(character).toBeTruthy();
    expect(Object.entries(character.tradeskills).reduce(extract, {})).toEqual({
      ['Arcana']: 250,
      ['Jewelcrafting']: 250,
      ['Leatherworking']: 250,
      ['Smelting']: 250,
      ['Stonecutting']: 250,
      ['Weaving']: 250,
      ['Woodworking']: 250
    });
  });

  it('should get T2 crafting chance', () => {
    const character = new Character(buddy);
    const craftable = service.getCraftable('IngotT2')!;
    expect(character.getYieldBonusChance(craftable.blueprints[0])).toBeCloseTo(0.4, 5);
  });

  it('should get T3 crafting chance', () => {
    const character = new Character(buddy);
    const craftable = service.getCraftable('IngotT3')!;
    expect(character.getYieldBonusChance(craftable.blueprints[0])).toBeCloseTo(0.4, 5);
  });

  it('should get T4 crafting chance', () => {
    const character = new Character(buddy);
    const craftable = service.getCraftable('IngotT4')!;
    expect(character.getYieldBonusChance(craftable.blueprints[0])).toBeCloseTo(0.4, 5);
  });

  it('should get T5 crafting chance', () => {
    const character = new Character(buddy);
    const craftable = service.getCraftable('IngotT5')!;
    expect(character.getYieldBonusChance(craftable.blueprints[0])).toBeCloseTo(0.4, 5);
  });

  it('should get T52 crafting chance', () => {
    const character = new Character(buddy);
    const craftable = service.getCraftable('IngotT52')!;
    expect(character.getYieldBonusChance(craftable.blueprints[0])).toBeCloseTo(0.4, 5);
  });
});

