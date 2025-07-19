import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSchematic } from './schematic';

describe('AppSchematic', () => {
  let component: AppSchematic;
  let fixture: ComponentFixture<AppSchematic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSchematic]
    }).compileComponents();

    fixture = TestBed.createComponent(AppSchematic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
