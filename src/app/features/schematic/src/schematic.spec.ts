import { provideZonelessChangeDetection } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Schematic } from './schematic';

describe('Schematic', () => {
  let component: Schematic;
  let fixture: ComponentFixture<Schematic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Schematic],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(Schematic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
