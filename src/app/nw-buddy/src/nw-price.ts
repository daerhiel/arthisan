import { Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { FitterFn, I18n } from '@app/core';

const OPACITY_FULL = 1;
const OPACITY_FAINT = 0.25;
const OPACITY_NORMAL = 0.6;

interface Components {
  integer: string | null;
  integerOp: number | null;
  pointOp: number | null;
  decimal: string | null;
  decimalOp: number | null;
}

export function getPriceInputs<T, R>(fitter: FitterFn<T, R>) {
  return (item: T, i18n: I18n) => {
    return { value: fitter(item, i18n) };
  }
}

@Component({
  selector: 'span[nw-price]',
  imports: [],
  providers: [DecimalPipe],
  templateUrl: './nw-price.html',
  styleUrl: './nw-price.scss'
})
export class NwPrice {
  readonly #formatter = inject(DecimalPipe);

  readonly value = input<number | null>(null);

  protected readonly _object = computed<Components | null>(() => {
    const string = this.#formatter.transform(this.value(), '1.2-2');

    if (string) {
      const match = /^([+-]?[\d,]+)(?:\.(\d+))?$/.exec(string);
      if (match) {
        const [, integer, decimal] = match;
        const integerOp = Math.abs(parseInt(integer, 10)) > 0 ? OPACITY_FULL : OPACITY_NORMAL;
        const decimalOp = Math.abs(parseInt(decimal, 10)) > 0.1 ? OPACITY_NORMAL : OPACITY_FAINT;
        return { integer, integerOp, pointOp: decimalOp, decimal, decimalOp };
      }
    }

    return null;
  });
}
