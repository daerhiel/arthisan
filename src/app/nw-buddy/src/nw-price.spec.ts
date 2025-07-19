import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { By } from '@angular/platform-browser';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getPriceInputs, NwPrice } from './nw-price';

describe('NwPriceComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let pipe: DecimalPipe

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [DecimalPipe]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pipe = TestBed.inject(DecimalPipe);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default structure', () => {
    const price = fixture.debugElement.query(By.css('span[nw-price]'));
    expect(price).toBeTruthy();
    expect(price.nativeElement).not.toHaveClass('nw-price');
  });

  it('should not render value by default', () => {
    const price = fixture.debugElement.query(By.css('span[nw-price]'));
    expect(price).toBeTruthy();
    expect(price.nativeElement.innerText).toBe('');
  });

  const values = [
    null,
    0,
    0.11,
    0.111,
    0.123456789,
    0.99,
    0.999,
    1,
    1.11,
    1.111,
    1.123456789,
    1.99,
    1.999,
    100,
    999.99,
    999.999,
    1000,
    1000.11,
    1000.111,
    1000.123456789,
    1000.99,
    1000.999,
    10000
  ];

  values.forEach(value => {
    it(`should render value: ${value}`, () => {
      component.value = value;
      fixture.detectChanges();

      const price = fixture.debugElement.query(By.css('span[nw-price]'));
      expect(price).toBeTruthy();
      expect(price.nativeElement.innerText).toBe(pipe.transform(value, '1.2-2') ?? '');
    });
  });

  it('should not render state by default', () => {
    const price = fixture.debugElement.query(By.css('span[nw-price]'));
    expect(price).toBeTruthy();
    expect(price.nativeElement).not.toHaveClass('nw-positive');
    expect(price.nativeElement).not.toHaveClass('nw-negative');
  });

  it('should render positive state', () => {
    component.state = true;
    fixture.detectChanges();

    const price = fixture.debugElement.query(By.css('span[nw-price]'));
    expect(price).toBeTruthy();
    expect(price.nativeElement).toHaveClass('nw-positive');
    expect(price.nativeElement).not.toHaveClass('nw-negative');
  });

  it('should render negative state', () => {
    component.state = false;
    fixture.detectChanges();

    const price = fixture.debugElement.query(By.css('span[nw-price]'));
    expect(price).toBeTruthy();
    expect(price.nativeElement).not.toHaveClass('nw-positive');
    expect(price.nativeElement).toHaveClass('nw-negative');
  });
});

describe('getPriceInputs', () => {
  interface Inputs {
    value: number;
    state?: boolean | null;
  }

  it('should return price inputs', () => {
    const object = { value: 42 };
    const inputs = getPriceInputs<Inputs, number>(x => x.value)(object);
    expect(inputs).toEqual({ value: 42, state: null });
  });

  it('should return price inputs with positive state', () => {
    const object = { value: 42, state: true };
    const inputs = getPriceInputs<Inputs, number>(x => x.value, x => x.state ?? null)(object);
    expect(inputs).toEqual({ value: 42, state: true });
  });

  it('should return price inputs with negative state', () => {
    const object = { value: 42, state: false };
    const inputs = getPriceInputs<Inputs, number>(x => x.value, x => x.state ?? null)(object);
    expect(inputs).toEqual({ value: 42, state: false });
  });
});

@Component({
  imports: [NwPrice],
  template: `<span nw-price [value]="value!" [state]="state!"></span>`
})
export class TestComponent {
  value?: number | null;
  state?: boolean | null;
}
