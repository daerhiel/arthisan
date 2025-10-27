import { provideZonelessChangeDetection } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getPriceInputs, NwPrice } from './nw-price';

describe('NwPrice', () => {
  let component: NwPrice;
  let fixture: ComponentFixture<NwPrice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NwPrice],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(NwPrice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default structure', () => {
    expect(fixture.nativeElement).not.toHaveClass('nw-price');
  });

  it('should not render value by default', () => {
    expect(fixture.nativeElement.innerText).toBe('');
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
      const pipe = new DecimalPipe('en-US');

      fixture.componentRef.setInput('value', value);
      fixture.componentRef.setInput('format', '1.2');
      fixture.detectChanges();

      expect(fixture.nativeElement.innerText).toBe(pipe.transform(value, '1.2') ?? '');
    });
  });

  it('should not render state by default', () => {
    expect(fixture.nativeElement).not.toHaveClass('nw-positive');
    expect(fixture.nativeElement).not.toHaveClass('nw-negative');
  });

  it('should have neutral state by default', () => {
    fixture.componentRef.setInput('state', true);
    fixture.detectChanges();

    expect(fixture.nativeElement).not.toHaveClass('nw-positive');
    expect(fixture.nativeElement).not.toHaveClass('nw-negative');
  });

  it('should render neutral state', () => {
    fixture.componentRef.setInput('value', 0);
    fixture.componentRef.setInput('state', true);
    fixture.detectChanges();

    expect(fixture.nativeElement).not.toHaveClass('nw-positive');
    expect(fixture.nativeElement).not.toHaveClass('nw-negative');
  });

  it('should render positive state', () => {
    fixture.componentRef.setInput('value', 42);
    fixture.componentRef.setInput('state', true);
    fixture.detectChanges();

    expect(fixture.nativeElement).toHaveClass('nw-positive');
    expect(fixture.nativeElement).not.toHaveClass('nw-negative');
  });

  it('should render negative state', () => {
    fixture.componentRef.setInput('value', -42);
    fixture.componentRef.setInput('state', true);
    fixture.detectChanges();

    expect(fixture.nativeElement).not.toHaveClass('nw-positive');
    expect(fixture.nativeElement).toHaveClass('nw-negative');
  });

  it('should render format', () => {
    fixture.componentRef.setInput('value', 42.12345);
    fixture.componentRef.setInput('format', '1.0-0');
    fixture.detectChanges();

    expect(fixture.nativeElement.innerText).toBe('42');
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
    expect(inputs).toEqual({ value: 42, state: undefined, format: undefined });
  });

  it('should return price inputs with positive state', () => {
    const object = { value: 42, state: true };
    const inputs = getPriceInputs<Inputs, number>(x => x.value, { state: true })(object);
    expect(inputs).toEqual({ value: 42, state: true, format: undefined });
  });

  it('should return price inputs with negative state', () => {
    const object = { value: -42, state: false };
    const inputs = getPriceInputs<Inputs, number>(x => x.value, { state: true })(object);
    expect(inputs).toEqual({ value: -42, state: true, format: undefined });
  });

  it('should set price format', () => {
    const object = { value: 42.05 };
    const inputs = getPriceInputs<Inputs, number>(x => x.value, { format: '1.0-0' })(object);
    expect(inputs).toEqual({ value: 42.05, state: undefined, format: '1.0-0' });
  });
});
