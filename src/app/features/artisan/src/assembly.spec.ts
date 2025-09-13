import { ApplicationInitStatus, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock, initializeGamingTools } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Ingredient } from './ingredient';
import { Materials } from './materials';
import { Assembly } from './assembly';
import { Projection } from './projection';
import { Provision } from './provision';

describe('Assembly', () => {
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

  // it('should throw for existing entity', () => {
  //   const craftable = service.getEntity('OreT1') as Craftable;
  //   expect(() => new Assembly(craftable)).toThrowError(/invalid craftable instance/i);
  // });

  it('should create for existing craftable entity', () => {
    const craftable = service.getCraftable('IngotT2');
    const assembly = new Assembly(craftable);
    expect(assembly).toBeTruthy();
    expect(assembly.entity).toBe(craftable);
    expect(assembly.projections.map(x => x.blueprint) ?? null).toEqual(craftable.blueprints);
    expect(assembly.materials).toBeInstanceOf(Materials);
  });

  it('should throw for non-existing craftable entity', () => {
    expect(() => new Assembly(null!)).toThrowError(/invalid entity instance/i);
  });

  it('should get the preferred projection', () => {
    const craftable = service.getCraftable('IngotT2');
    const assembly = new Assembly(craftable);
    expect(assembly.projection).toBeTruthy();
    expect(assembly.projection?.blueprint).toBe(craftable.blueprints[0]);
  });

  it('should get preferred T2 crafting chance', () => {
    const craftable = service.getCraftable('IngotT2');
    const assembly = new Assembly(craftable);
    expect(assembly.chance).toBe(0.3);
  });

  it('should get preferred T3 crafting chance', () => {
    const craftable = service.getCraftable('IngotT3');
    const assembly = new Assembly(craftable);
    expect(assembly.chance).toBeCloseTo(0.28);
  });

  it('should get preferred T4 crafting chance', () => {
    const craftable = service.getCraftable('IngotT4');
    const assembly = new Assembly(craftable);
    expect(assembly.chance).toBe(0.23);
  });

  it('should get preferred T5 crafting chance', () => {
    const craftable = service.getCraftable('IngotT5');
    const assembly = new Assembly(craftable);
    expect(assembly.chance).toBe(0.18);
  });

  it('should get preferred T52 crafting chance', () => {
    const craftable = service.getCraftable('IngotT52');
    const assembly = new Assembly(craftable);
    expect(assembly.chance).toBeCloseTo(0.03);
  });

  it('should not have effective volume by default', () => {
    const craftable = service.getCraftable('IngotT2');
    const assembly = new Assembly(craftable);
    expect(assembly.effective).toBe(null);
  });

  it('should get the market value', () => {
    const craftable = service.getCraftable('IngotT2');
    const assembly = new Assembly(craftable);
    assembly.crafted.set(false);
    expect(assembly.value).toBe(4);
  });

  it('should get the crafted value', () => {
    const provision = jasmine.createSpyObj<Provision>('Provision', {}, {
      projection: jasmine.createSpyObj<Projection>('Projection', { volume: 1 }),
      ingredient: jasmine.createSpyObj<Ingredient>('Ingredient', [], { quantity: 4 }),
      volume: 1
    });
    const craftable = service.getCraftable('IngotT2');
    const assembly = new Assembly(craftable);
    assembly.bind(provision);
    assembly.crafted.set(true);
    expect(assembly.value).toBe(2);
  });

  it('should have a purchase flag by default', () => {
    const craftable = service.getCraftable('IngotT2');
    const assembly = new Assembly(craftable);
    expect(assembly.crafted()).toBe(false);
  });

  it('should set the crafted flag', () => {
    const craftable = service.getCraftable('IngotT2');
    const assembly = new Assembly(craftable);
    expect(assembly.crafted()).toBe(false);

    assembly.crafted.set(true);
    expect(assembly.crafted()).toBe(true);
  });

  it('should get state', () => {
    const craftable = service.getCraftable('IngotT2');
    const assembly = new Assembly(craftable);
    const state = assembly.getState();
    expect(state).toEqual({ crafted: false });
  });

  it('should set state', () => {
    const craftable = service.getCraftable('IngotT2');
    const assembly = new Assembly(craftable);
    assembly.setState({ crafted: true });
    expect(assembly).toBeTruthy();
    expect(assembly.crafted()).toBe(true);
  });
});
