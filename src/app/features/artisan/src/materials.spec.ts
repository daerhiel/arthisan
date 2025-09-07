import { ApplicationInitStatus, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock, initializeGamingTools } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Materials, OptimizationMode, Stage } from './materials';
import { Purchase } from './purchase';
import { Provision } from './provision';

function extractStage(stage: Stage): { id: string; items: string[] } {
  return { id: stage.id, items: stage.materials.map(x => x.entity.id) };
}

describe('Materials', () => {
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

  it('should create material index', () => {
    const materials = new Materials();
    expect(materials).toBeTruthy();
  });

  it('should throw on missing purchase instance', () => {
    const materials = new Materials();
    expect(() => materials.index(null!)).toThrowError(/invalid purchase instance/i);
  });

  it('should throw on duplicate purchase index', () => {
    const materials = new Materials();
    const entity = service.getEntity('OreT1')!;
    const purchase = new Purchase(entity, materials);
    materials.index(purchase);
    expect(() => new Purchase(entity, materials)).toThrowError(/material is already indexed/i);
  });

  it('should index a purchase', () => {
    const materials = new Materials();
    const entity = service.getEntity('OreT1')!;
    const purchase = new Purchase(entity, materials);
    materials.index(purchase);
    expect(materials.ids).toEqual(['OreT1']);
  });

  it('should index an assembly', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT2')!;
    const assembly = craftable.request(materials);
    materials.index(assembly);
    expect(materials.ids).toEqual([assembly.entity.id, 'OreT1']);
    expect(materials.assembly).toBe(assembly);
  });

  it('should index the same purchase multiple times', () => {
    const materials = new Materials();
    const entity = service.getEntity('OreT1')!;
    const purchase = new Purchase(entity, materials);
    materials.index(purchase);
    materials.index(purchase);
    expect(materials.ids).toEqual(['OreT1']);
  });

  it('should get indexed purchase by id', () => {
    const materials = new Materials();
    const entity = service.getEntity('OreT1')!;
    const purchase = new Purchase(entity, materials);
    materials.index(purchase);
    expect(materials.get(entity.id)).toBe(purchase);
  });

  it('should assign only root assembly when indexing', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT3')!;
    const assembly = craftable.request(materials);
    materials.index(assembly);
    expect(materials.assembly).toBe(assembly);
    expect(materials.ids).toEqual([
      assembly.entity.id,
      'IngotT2', 'OreT1',
      'CharcoalT1',
      'WoodT1', 'WoodT2', 'WoodT4', 'WoodT5', 'WoodT52',
      'WoodenCoin', 'FluxT5'
    ]);
  });

  it('should request a purchase for a material', () => {
    const provision = jasmine.createSpyObj<Provision>('Provision', ['ingredient']);
    const materials = new Materials();
    const entity = service.getEntity('OreT1')!;
    const purchase = materials.request(provision, entity);
    expect(purchase).toBeInstanceOf(Purchase);
    expect(purchase.entity).toBe(entity);
  });

  it('should return cached purchase for a material', () => {
    const provision = jasmine.createSpyObj<Provision>('Provision', ['ingredient']);
    const materials = new Materials();
    const entity = service.getEntity('OreT1')!;
    const purchase1 = materials.request(provision, entity);
    expect(purchase1).toBeInstanceOf(Purchase);
    expect(purchase1.entity).toBe(entity);

    const purchase2 = materials.request(provision, entity);
    expect(purchase2).toBe(purchase1);
  });

  it('should set root assembly', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT2')!;
    const assembly = craftable.request(materials);
    expect(materials.assembly).toBe(assembly);
  });

  it('should throw error if root assembly is not set', () => {
    const materials = new Materials();
    expect(() => materials.prepare()).toThrowError('Root assembly is not set.');
  });

  it('should build metadata for T2 assembly', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT2')!;
    const assembly = craftable.request(materials);
    materials.optimize(OptimizationMode.CraftAll);
    expect(materials.ids).toEqual([
      assembly.entity.id, 'OreT1'
    ]);
  });

  it('should build metadata for T3 assembly', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT3')!;
    const assembly = craftable.request(materials);
    materials.optimize(OptimizationMode.CraftAll);
    expect(materials.ids).toEqual([
      assembly.entity.id,
      'IngotT2', 'OreT1',
      'CharcoalT1',
      'WoodT1', 'WoodT2', 'WoodT4', 'WoodT5', 'WoodT52',
      'WoodenCoin', 'FluxT5'
    ]);
  });

  it('should build metadata for T4 assembly', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT4')!;
    const assembly = craftable.request(materials);
    materials.optimize(OptimizationMode.CraftAll);
    expect(materials.ids).toEqual([
      assembly.entity.id,
      'IngotT3', 'IngotT2',
      'OreT1', 'CharcoalT1',
      'WoodT1', 'WoodT2', 'WoodT4', 'WoodT5', 'WoodT52',
      'WoodenCoin', 'FluxT5', 'OreT4'
    ]);
  });

  it('should build metadata for T5 assembly', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT5')!;
    const assembly = craftable.request(materials);
    materials.optimize(OptimizationMode.CraftAll);
    expect(materials.ids).toEqual([
      assembly.entity.id,
      'IngotT4', 'IngotT3', 'IngotT2',
      'OreT1',
      'CharcoalT1',
      'WoodT1', 'WoodT2', 'WoodT4', 'WoodT5', 'WoodT52',
      'WoodenCoin', 'FluxT5', 'OreT4', 'OreT5'
    ]);
  });

  it('should build metadata for T52 assembly', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT52')!;
    const assembly = craftable.request(materials);
    materials.optimize(OptimizationMode.CraftAll);
    expect(materials.ids).toEqual([
      assembly.entity.id,
      'IngotT5', 'IngotT4', 'IngotT3', 'IngotT2',
      'OreT1',
      'CharcoalT1',
      'WoodT1', 'WoodT2', 'WoodT4', 'WoodT5', 'WoodT52',
      'WoodenCoin', 'FluxT5', 'OreT4', 'OreT5', 'OreT52'
    ]);
  });

  it('should prepare stages for T2 assembly', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT2')!;
    const assembly = craftable.request(materials);
    materials.optimize(OptimizationMode.CraftAll);
    const stages = materials.prepare();
    expect(stages.map(extractStage)).toEqual([
      { id: 'assembly', items: [assembly.entity.id] },
      { id: 'stage-1', items: ['OreT1'] }
    ]);
  });

  it('should prepare stages for T3 assembly', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT3')!;
    const assembly = craftable.request(materials);
    materials.optimize(OptimizationMode.CraftAll);
    const stages = materials.prepare();
    expect(stages.map(extractStage)).toEqual([
      { id: 'assembly', items: [assembly.entity.id] },
      { id: 'stage-1', items: ['IngotT2', 'CharcoalT1', 'FluxT5'] },
      { id: 'stage-2', items: ['OreT1', 'WoodT1'] }
    ]);
  });

  it('should prepare stages for T4 assembly', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT4')!;
    const assembly = craftable.request(materials);
    materials.optimize(OptimizationMode.CraftAll);
    const stages = materials.prepare();
    expect(stages.map(extractStage)).toEqual([
      { id: 'assembly', items: [assembly.entity.id] },
      { id: 'stage-1', items: ['IngotT3', 'OreT4'] },
      { id: 'stage-2', items: ['IngotT2', 'CharcoalT1', 'FluxT5'] },
      { id: 'stage-3', items: ['OreT1', 'WoodT1'] }
    ]);
  });

  it('should prepare stages for T5 assembly', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT5')!;
    const assembly = craftable.request(materials);
    materials.optimize(OptimizationMode.CraftAll);
    const stages = materials.prepare();
    expect(stages.map(extractStage)).toEqual([
      { id: 'assembly', items: [assembly.entity.id] },
      { id: 'stage-1', items: ['IngotT4', 'OreT5'] },
      { id: 'stage-2', items: ['IngotT3', 'OreT4'] },
      { id: 'stage-3', items: ['IngotT2', 'CharcoalT1', 'FluxT5'] },
      { id: 'stage-4', items: ['OreT1', 'WoodT1'] }
    ]);
  });

  it('should prepare stages for T52 assembly', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT52')!;
    const assembly = craftable.request(materials);
    materials.optimize(OptimizationMode.CraftAll);
    const stages = materials.prepare();
    expect(stages.map(extractStage)).toEqual([
      { id: 'assembly', items: [assembly.entity.id] },
      { id: 'stage-1', items: ['IngotT5', 'OreT52'] },
      { id: 'stage-2', items: ['IngotT4', 'OreT5'] },
      { id: 'stage-3', items: ['IngotT3', 'OreT4'] },
      { id: 'stage-4', items: ['IngotT2', 'CharcoalT1', 'FluxT5'] },
      { id: 'stage-5', items: ['OreT1', 'WoodT1'] }
    ]);
  });

  it('should optimize materials', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT52')!;
    const assembly = craftable.request(materials);
    materials.optimize(OptimizationMode.CraftAll);
    expect(assembly.crafted()).toBeTrue();
  });

  it('should throw on invalid optimization mode', () => {
    const materials = new Materials();
    expect(() => materials.optimize(9999 as OptimizationMode)).toThrowError(/unsupported optimization mode/i);
  });

  it('should get state', () => {
    const materials = new Materials();
    const state = materials.getState();
    expect(state).toEqual({ entities: {} });
  });

  it('should get T2 craftable state', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT2')!;
    const assembly = craftable.request(materials);
    assembly.crafted.set(true);
    const state = materials.getState();
    expect(state).toEqual({
      entities: {
        IngotT2: { crafted: true },
        OreT1: {}
      }
    });
  });

  it('should set state', () => {
    const materials = new Materials();
    materials.setState({ entities: {} });
    const state = materials.getState();
    expect(state).toEqual({ entities: {} });
  });

  it('should handle null state', () => {
    const materials = new Materials();
    materials.setState(null!);
    const state = materials.getState();
    expect(state).toEqual({ entities: {} });
  });

  it('should set T2 craftable state', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT2')!;
    const assembly = craftable.request(materials);
    materials.setState({
      entities: {
        IngotT2: { crafted: true },
        OreT1: {}
      }
    });
    expect(assembly.crafted()).toBeTrue();
  });
});
