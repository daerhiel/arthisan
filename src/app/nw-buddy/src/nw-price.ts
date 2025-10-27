import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { GetterFn } from '@app/core';
import { stateAttribute } from './state-pipe';

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

interface InputOptions {
  state?: boolean | null;
  format?: string | null;
}

/**
 * Get the price inputs from a given item.
 * @param fitter A function that gets a value from an item to display.
 * @param getter A function that gets a state from an item to display.
 * @returns A function that maps an item to its price inputs.
 */
export function getPriceInputs<T, R>(fitter: GetterFn<T, R>, { state, format }: InputOptions = {}) {
  return (item: T) => {
    return { value: fitter(item), state, format };
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

  /**
   * The value of a price.
   */
  readonly value = input<number | null | undefined>();

  /**
   * The display state of the price.
   */
  readonly state = input(false, { transform: stateAttribute });

  /**
   * The number format to use for display.
   */
  readonly format = input<string>('1.2-3');

  protected readonly _classes = computed(() => {
    const classes = [];

    let value = this.state();
    if (typeof value === 'boolean' && value) {
      value = this.value() ?? 0;
    }
    if (value) {
      value > 0 && classes.push('nw-positive');
      value < 0 && classes.push('nw-negative');
    }

    return classes;
  });

  protected readonly _object = computed<Components | null>(() => {
    const string = this.#formatter.transform(this.value(), this.format());

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
