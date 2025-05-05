import { By } from '@angular/platform-browser';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NwIcon } from './nw-icon';
import { Component } from '@angular/core';
import { ItemRarity } from '@app/nw-data';

describe('NwIcon', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NwIcon],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render icon structure', () => {
    component.path = 'icon/path.png';
    component.name = 'Test Icon';
    component.rarity = 'common';
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('picture[nw-icon]'));
    expect(icon).toBeTruthy();
    expect(icon.nativeElement).toHaveClass('nw-icon');
    expect(icon.nativeElement).toHaveClass('nw-item-icon-frame');
    expect(icon.nativeElement).toHaveClass('nw-item-icon-bg');

    const border = icon.nativeElement.querySelector('.nw-item-icon-border');
    expect(border).toBeTruthy();
    expect(border).toHaveClass('nw-item-icon-border');

    const image = icon.nativeElement.querySelector('img');
    expect(image).toBeTruthy();
    expect(image.src).toContain('icon/path.png');
    expect(image.alt).toBe('Test Icon');
  });

  it('should apply rarity class', () => {
    component.path = 'icon/path.png';
    component.name = 'Test Icon';
    component.rarity = 'rare';
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('picture[nw-icon]'));
    expect(icon.nativeElement).toHaveClass('nw-item-rarity-rare');
  });

  it('should apply named class', () => {
    component.path = 'icon/path.png';
    component.name = 'Test Icon';
    component.rarity = 'common';
    component.named = true;
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('picture[nw-icon]'));
    expect(icon.nativeElement).toHaveClass('named');
  });

  it('should apply size class', () => {
    component.path = 'icon/path.png';
    component.name = 'Test Icon';
    component.rarity = 'common';
    component.size = 15;
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('picture[nw-icon]'));
    expect(icon.nativeElement).toHaveClass('app-w-15');
  });
});

@Component({
  imports: [NwIcon],
  template: `<picture nw-icon [path]="path" [name]="name" [rarity]="rarity" [named]="named" [size]="size"></picture>`,
})
export class TestComponent {
  path?: string | null;
  name?: string | null;
  rarity?: ItemRarity | null;
  named = false;
  size?: number | null;
}
