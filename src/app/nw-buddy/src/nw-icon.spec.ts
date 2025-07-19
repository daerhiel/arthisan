import { provideZonelessChangeDetection } from '@angular/core';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NwIcon } from './nw-icon';
import { By } from '@angular/platform-browser';

describe('NwIcon', () => {
  let component: NwIcon;
  let fixture: ComponentFixture<NwIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NwIcon],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(NwIcon);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'Test Icon');
    fixture.componentRef.setInput('path', 'icon/path.png');
    fixture.componentRef.setInput('rarity', 'common');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render icon structure', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement).toHaveClass('nw-icon');
    expect(fixture.nativeElement).toHaveClass('nw-item-icon-frame');
    expect(fixture.nativeElement).toHaveClass('nw-item-icon-bg');

    const border = fixture.debugElement.query(By.css('.nw-item-icon-border'));
    expect(border).toBeTruthy();
    expect(border.nativeElement).toHaveClass('nw-item-icon-border');

    const image = fixture.debugElement.query(By.css('img'));
    expect(image).toBeTruthy();
    expect(image.nativeElement.src).toContain('icon/path.png');
    expect(image.nativeElement.alt).toBe('Test Icon');
  });

  it('should apply rarity class', () => {
    fixture.componentRef.setInput('rarity', 'rare');
    fixture.detectChanges();

    expect(fixture.nativeElement).toHaveClass('nw-item-rarity-rare');
  });

  it('should apply named class', () => {
    fixture.componentRef.setInput('named', true);
    fixture.detectChanges();

    expect(fixture.nativeElement).toHaveClass('named');
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 15);
    fixture.detectChanges();

    expect(fixture.nativeElement).toHaveClass('app-w-15');
  });
});
