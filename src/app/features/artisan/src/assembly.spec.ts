import { ApplicationInitStatus, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock, initializeGamingTools } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Materials } from './materials';
import { Assembly } from './assembly';

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
    expect(assembly.bonus).toBe(0);
  });

  it('should get preferred T3 crafting chance', () => {
    const craftable = service.getCraftable('IngotT3');
    const assembly = new Assembly(craftable);
    expect(assembly.bonus).toBe(-0.02);
  });

  it('should get preferred T4 crafting chance', () => {
    const craftable = service.getCraftable('IngotT4');
    const assembly = new Assembly(craftable);
    expect(assembly.bonus).toBe(-0.05);
  });

  it('should get preferred T5 crafting chance', () => {
    const craftable = service.getCraftable('IngotT5');
    const assembly = new Assembly(craftable);
    expect(assembly.bonus).toBe(-0.07);
  });

  it('should get preferred T52 crafting chance', () => {
    const craftable = service.getCraftable('IngotT52');
    const assembly = new Assembly(craftable);
    expect(assembly.bonus).toBe(-0.2);
  });

  it('should not have effective volume by default', () => {
    const craftable = service.getCraftable('IngotT2');
    const assembly = new Assembly(craftable);
    expect(assembly.effective).toBe(null);
  });

  it('should get the value', () => {
    const craftable = service.getCraftable('IngotT2');
    const assembly = new Assembly(craftable);
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
