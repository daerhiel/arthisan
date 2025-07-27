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
});
