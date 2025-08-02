import { provideZonelessChangeDetection } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Materials, Stage } from './materials';
import { OptimizationMode } from './assembly';
import { Purchase } from './purchase';

function extractStage(stage: Stage): { id: string; items: string[] } {
  return { id: stage.id, items: stage.materials.map(x => x.entity.id) };
}

describe('Materials', () => {
  let service: Artisan;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
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

  it('should create material index', () => {
    const materials = new Materials();
    expect(materials).toBeTruthy();
  });

  it('should request a purchase for a material', () => {
    const materials = new Materials();
    const item = service.getEntity('OreT1')!;
    const purchase = materials.request(item);
    expect(purchase).toBeInstanceOf(Purchase);
    expect(purchase.entity).toBe(item);
  });

  it('should return cached purchase for a material', () => {
    const materials = new Materials();
    const item = service.getEntity('OreT1')!;
    const purchase1 = materials.request(item);
    expect(purchase1).toBeInstanceOf(Purchase);
    expect(purchase1.entity).toBe(item);

    const purchase2 = materials.request(item);
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

  it('should prepare stages for T2 assembly', () => {
    const materials = new Materials();
    const craftable = service.getCraftable('IngotT2')!;
    const assembly = craftable.request(materials);
    assembly.optimize(OptimizationMode.CraftAll);
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
    assembly.optimize(OptimizationMode.CraftAll);
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
    assembly.optimize(OptimizationMode.CraftAll);
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
    assembly.optimize(OptimizationMode.CraftAll);
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
    assembly.optimize(OptimizationMode.CraftAll);
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
});
