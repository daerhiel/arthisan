import { provideZonelessChangeDetection } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Materials } from './materials';
import { Purchase } from './purchase';
import { Provision } from './provision';

describe('Purchase', () => {
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

  it('should throw on missing entity', () => {
    expect(() => new Purchase(null!, null!)).toThrowError('Invalid entity instance.');
  });

  it('should throw on missing materials', () => {
    const entity = service.getEntity('OreT1')!;
    expect(() => new Purchase(entity, null!)).toThrowError('Invalid materials instance.');
  });

  it('should create for existing entity', () => {
    const entity = service.getEntity('OreT1')!;
    const materials = new Materials();
    const purchase = new Purchase(entity, materials);
    expect(purchase).toBeTruthy();
    expect(purchase.entity).toBe(entity);
    expect(purchase.materials).toBe(materials);
    expect(purchase.bonus).toBeNull();
  });

  it('should create for existing craftable entity', () => {
    const entity = service.getEntity('IngotT2')!;
    const materials = new Materials();
    const purchase = new Purchase(entity, materials);
    expect(purchase).toBeTruthy();
    expect(purchase.entity).toBe(entity);
    expect(purchase.bonus).toBeNull();
  });

  it('should not have a bonus by default', () => {
    const entity = service.getEntity('OreT1')!;
    const materials = new Materials();
    const purchase = new Purchase(entity, materials);
    expect(purchase.bonus).toBeNull();
  });

  it('should get the item price', () => {
    const entity = service.getEntity('IngotT2')!;
    const materials = new Materials();
    const purchase = new Purchase(entity, materials);
    expect(purchase.price).toBe(4);
  });

  it('should have default cost of zero', () => {
    const entity = service.getEntity('OreT1')!;
    const materials = new Materials();
    const purchase = new Purchase(entity, materials);
    expect(purchase.cost).toBe(0);
  });

  it('should calculate cost based on requested items', () => {
    const entity = service.getEntity('IngotT2')!;
    const materials = new Materials();
    const purchase = new Purchase(entity, materials);

    const assembly = jasmine.createSpyObj('Assembly', { crafted: true });
    const projection = jasmine.createSpyObj('Projection', { volume: 1 }, { assembly });
    const ingredient = jasmine.createSpyObj('Ingredient', [], { 'quantity': 4 });
    const provision = jasmine.createSpyObj<Provision>('Provision', [], { projection, ingredient });
    purchase.bind(provision);

    expect(purchase.requested()).toBe(4);
    expect(purchase.cost).toBe(16);
  });

  it('should get state', () => {
    const entity = service.getEntity('OreT1')!;
    const materials = new Materials();
    const purchase = new Purchase(entity, materials);
    const state = purchase.getState();
    expect(state).toEqual({});
  });

  it('should set state', () => {
    const entity = service.getEntity('OreT1')!;
    const materials = new Materials();
    const purchase = new Purchase(entity, materials);
    purchase.setState({});
    expect(purchase).toBeTruthy();
  });
});
