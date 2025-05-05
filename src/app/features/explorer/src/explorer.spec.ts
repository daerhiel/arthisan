import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NwBuddyApiMock } from '@app/nw-buddy/testing';

import { NwBuddyApi } from '@app/nw-buddy';
import { ExplorerComponent } from './explorer';

describe('ExplorerComponent', () => {
  let component: ExplorerComponent;
  let fixture: ComponentFixture<ExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExplorerComponent],
      providers: [
        { provide: NwBuddyApi, useClass: NwBuddyApiMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
