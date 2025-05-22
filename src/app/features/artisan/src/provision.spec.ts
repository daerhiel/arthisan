import { firstValueFrom, timer } from "rxjs";

import { TestBed } from "@angular/core/testing";
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock } from '@app/gaming-tools/testing';

import { NwBuddyApi, NwI18n } from '@app/nw-buddy';
import { GamingTools, GamingToolsApi } from '@app/gaming-tools';
import { Artisan } from "./artisan";
import { Ingredient } from "./ingredient";
import { Provision } from './provision';

describe('Provision', () => {
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

  it('should create for existing ingredient', () => {
    const ingredient = new Ingredient(service, 'OreT1', 'Item', 1);
    const material = new Provision(ingredient);
    expect(material).toBeTruthy();
    expect(material.ingredient).toBe(ingredient);
  });

  it('should throw for non-existing ingredient', () => {
    expect(() => new Provision(null!)).toThrowError(/invalid ingredient instance/i);
  });
});
