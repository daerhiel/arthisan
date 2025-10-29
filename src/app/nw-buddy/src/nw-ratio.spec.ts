import { provideZonelessChangeDetection } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { getRatioInputs, NwRatio } from './nw-ratio';

describe('NwRatio', () => {
  let component: NwRatio;
  let fixture: ComponentFixture<NwRatio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NwRatio],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(NwRatio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default structure', () => {
    expect(fixture.nativeElement).not.toHaveClass('nw-ratio');
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
  ];

  values.forEach(value => {
    it(`should render value: ${value}`, () => {
      const pipe = new DecimalPipe('en-US');

      fixture.componentRef.setInput('value', value);
      fixture.componentRef.setInput('format', '1.2-2');
      fixture.detectChanges();

      let expected: string | null = '';
      if (value) {
        value = value * 100;
        expected = `${pipe.transform(value, '1.2-2')}%`;
      }

      expect(fixture.nativeElement.innerText).toBe(expected);
    });
  });

  it('should render format', () => {
    fixture.componentRef.setInput('value', 0.4212345);
    fixture.componentRef.setInput('format', '1.0-0');
    fixture.detectChanges();

    expect(fixture.nativeElement.innerText).toBe('42%');
  });

  const tests = [
    { value: 42, state: false, classes: [] },
    { value: 0, state: false, classes: [] },
    { value: -42, state: false, classes: [] },
    { value: 42, state: true, classes: ['nw-positive'] },
    { value: 0, state: true, classes: [] },
    { value: -42, state: true, classes: ['nw-negative'] },
    { value: 42, state: 5, classes: ['nw-positive'] },
    { value: 42, state: 0, classes: [] },
    { value: 42, state: -5, classes: ['nw-negative'] },
    { value: -42, state: 5, classes: ['nw-positive'] },
    { value: -42, state: 0, classes: [] },
    { value: -42, state: -5, classes: ['nw-negative'] },
  ];

  tests.forEach(({ value, state, classes }) => {
    it(`should apply ${classes.join(' ')} class`, () => {
      fixture.componentRef.setInput('value', value);
      fixture.componentRef.setInput('state', state);
      fixture.detectChanges();

      expect([...fixture.nativeElement.classList]).toEqual(jasmine.arrayContaining(classes));
    });
  });
});

describe('getRatioInputs', () => {
  interface Inputs {
    value: number;
    state?: boolean | null;
  }

  it('should return ratio inputs', () => {
    const object = { value: 42 };
    const inputs = getRatioInputs<Inputs, number>(x => x.value)(object);
    expect(inputs).toEqual({ value: 42, state: undefined, format: undefined });
  });

  it('should return price inputs with positive state', () => {
    const object = { value: 42, state: true };
    const inputs = getRatioInputs<Inputs, number>(x => x.value, { state: true })(object);
    expect(inputs).toEqual({ value: 42, state: true, format: undefined });
  });

  it('should return price inputs with negative state', () => {
    const object = { value: -42, state: false };
    const inputs = getRatioInputs<Inputs, number>(x => x.value, { state: true })(object);
    expect(inputs).toEqual({ value: -42, state: true, format: undefined });
  });

  it('should set ratio format', () => {
    const object = { value: 42.05 };
    const inputs = getRatioInputs<Inputs, number>(x => x.value, { format: '1.0-0' })(object);
    expect(inputs).toEqual({ value: 42.05, state: undefined, format: '1.0-0' });
  });
});
