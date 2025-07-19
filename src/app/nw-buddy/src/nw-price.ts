import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { GetterFn } from '@app/core';

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

/**
 * Get the price inputs from a given item.
 * @param fitter A function that gets a value from an item to display.
 * @param getter A function that gets a state from an item to display.
 * @param item The item to get the inputs from.
 * @returns A function that returns an object with a component input value set.
 */
export function getPriceInputs<T, R>(fitter: GetterFn<T, R>, getter?: GetterFn<T, boolean | null>) {
  return (item: T) => {
    return { value: fitter(item), state: getter ? getter(item) : null };
  }
}

@Component({
  selector: 'span[nw-price]',
  imports: [],
  host: {
    '[class]': '_classes()',
  },
  providers: [DecimalPipe],
  templateUrl: './nw-price.html',
  styleUrl: './nw-price.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NwPrice {
  readonly #formatter = inject(DecimalPipe);

  readonly value = input<number | null>(null);

  readonly state = input<boolean | null>(null);

  protected readonly _classes = computed(() => {
    const classes = [];

    const state = this.state();
    if (state != null) {
      classes.push(state ? 'nw-positive' : 'nw-negative');
    }

    return classes;
  });

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
