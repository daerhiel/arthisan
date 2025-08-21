import { provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeNwBuddy, NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock, initializeGamingTools } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingToolsApi } from '@app/gaming-tools';
import { EXPLORE_ITEM_CLASSES, Explorer } from './explorer';

describe('Explorer', () => {
  let component: Explorer;
  let fixture: ComponentFixture<Explorer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Explorer],
      providers: [
        provideZonelessChangeDetection(),
        provideAppInitializer(initializeNwBuddy),
        provideAppInitializer(initializeGamingTools),
        { provide: NwBuddyApi, useClass: NwBuddyApiMock },
        { provide: GamingToolsApi, useClass: GamingToolsApiMock },
        { provide: EXPLORE_ITEM_CLASSES, useValue: ['Resource'] }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Explorer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
