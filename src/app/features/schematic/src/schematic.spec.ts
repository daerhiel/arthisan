import { inject, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NwBuddyApiMock } from '@app/nw-buddy/testing';
import { GamingToolsApiMock, initializeGamingTools } from '@app/gaming-tools/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { GamingToolsApi } from '@app/gaming-tools';
import { Artisan, Production } from '@features/artisan';
import { Schematic } from './schematic';

function loadProduction(): Production {
  const service = inject(Artisan);
  return new Production(service.getCraftable('IngotT2'));
}

describe('Schematic', () => {
  let component: Schematic;
  let fixture: ComponentFixture<Schematic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Schematic],
      providers: [
        provideZonelessChangeDetection(),
        provideAppInitializer(initializeGamingTools),
        { provide: NwBuddyApi, useClass: NwBuddyApiMock },
        { provide: GamingToolsApi, useClass: GamingToolsApiMock },
        { provide: MAT_DIALOG_DATA, useFactory: loadProduction },
        { provide: MatDialogRef, useValue: { beforeClosed: () => of(true) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Schematic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
