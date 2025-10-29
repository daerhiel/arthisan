import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { GetterFn } from '@app/core';
import { stateAttribute } from './state-pipe';

interface InputOptions {
  state?: boolean | null;
  format?: string | null;
}

/**
 * Get the ratio inputs from a given item.
 * @param fitter A function that gets a value from an item to display.
 * @param format The format to use for the value.
 * @returns A function that maps an item to its ratio inputs.
 */
export function getRatioInputs<T, R>(fitter: GetterFn<T, R>, { state, format }: InputOptions = {}) {
  return (item: T) => {
    return { value: fitter(item), state, format };
  }
}

@Component({
  selector: 'span[nw-ratio]',
  imports: [],
  host: {
    '[class]': '_classes()',
  },
  providers: [DecimalPipe],
  templateUrl: './nw-ratio.html',
  styleUrl: './nw-ratio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NwRatio {
  readonly #formatter = inject(DecimalPipe);

  /**
   * The value of a ratio.
   */
  readonly value = input<number | null | undefined>();

  /**
   * The display state of the price.
   */
  readonly state = input(false, { transform: stateAttribute });

  /**
   * The number format to use for display.
   */
  readonly format = input<string>('1.0-2');

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

  protected readonly _value = () => {
    const value = this.value();
    return value && this.#formatter.transform(value * 100, this.format());
  }
}
