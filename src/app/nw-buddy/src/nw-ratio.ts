import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { GetterFn } from '@app/core';

interface InputOptions<T> {
  getter?: GetterFn<T, boolean | null>;
  format?: string | null;
}

/**
 * Get the ratio inputs from a given item.
 * @param fitter A function that gets a value from an item to display.
 * @param format The format to use for the value.
 * @returns A function that maps an item to its ratio inputs.
 */
export function getRatioInputs<T, R>(fitter: GetterFn<T, R>, { getter, format }: InputOptions<T> = {}) {
  return (item: T) => {
    return { value: fitter(item), state: getter ? getter(item) : null, format };
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
  readonly state = input<boolean | null>(null);

  /**
   * The number format to use for display.
   */
  readonly format = input<string>('1.0-2');

  protected readonly _classes = computed(() => {
    const classes = [];

    const state = this.state();
    if (state != null) {
      classes.push(state ? 'nw-positive' : 'nw-negative');
    }

    return classes;
  });

  protected readonly _value = () => {
    const value = this.value();
    return value && this.#formatter.transform(value * 100, this.format());
  }
}
