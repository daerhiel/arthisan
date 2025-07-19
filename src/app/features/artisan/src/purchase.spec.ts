import { provideZonelessChangeDetection } from '@angular/core';
import { firstValueFrom, timer } from 'rxjs';

import { TestBed } from '@angular/core/testing';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from './artisan';
import { Purchase } from './purchase';

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

  it('should create for existing entity', () => {
    const entity = service.getEntity('OreT1')!;
    const purchase = new Purchase(entity);
    expect(purchase).toBeTruthy();
    expect(purchase.entity).toBe(entity);
    expect(purchase.bonus).toBeNull();
  });

  it('should create for existing craftable', () => {
    const entity = service.getEntity('IngotT2')!;
    const purchase = new Purchase(entity);
    expect(purchase).toBeTruthy();
    expect(purchase.entity).toBe(entity);
    expect(purchase.bonus).toBeNull();
  });
});
