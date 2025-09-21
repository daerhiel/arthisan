import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { GetterFn } from './object-cache';

interface InputOptions {
  format?: string | null;
}

/**
 * Get the ratio inputs from a given item.
 * @param fitter A function that gets a value from an item to display.
 * @param format The format to use for the value.
 * @returns A function that maps an item to its ratio inputs.
 */
export function getRatioInputs<T, R>(fitter: GetterFn<T, R>, { format }: InputOptions = {}) {
  return (item: T) => {
    return { value: fitter(item), format };
  }
}

@Component({
  selector: 'span[nw-ratio]',
  imports: [],
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
   * The number format to use for display.
   */
  readonly format = input<string>('1.0-2');

  protected readonly _value = () => {
    const value = this.value();
    return value && this.#formatter.transform(value * 100, this.format());
  }
}
