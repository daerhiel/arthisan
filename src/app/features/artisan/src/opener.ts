import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, Type } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { FitterFn, I18n } from '@app/core';

/**
 * Gets the inputs for an opener component.
 * @template T The type of the object to get the value from.
 * @template R The type of the value to display.
 * @template C The type of the component to use for the dialog.
 * @param fitter A function that gets a value from an object to display.
 * @param component The component to use for the dialog.
 * @param config The configuration for the dialog.
 * @returns A function that takes an object and returns the inputs for the dialog.
 */
export function getOpenerInputs<T, R, C>(fitter: FitterFn<T, R>, component: Type<C>, config: MatDialogConfig<T>) {
  return (object: T, i18n: I18n) => {
    return { value: fitter(object, i18n), component, config: { ...config, data: object } };
  };
}

/**
 * Component to open a dialog with a specified component and configuration.
 * @template C The type of the component to open.
 */
@Component({
  selector: '[app-opener]',
  imports: [],
  templateUrl: './opener.html',
  styleUrl: './opener.scss',
  host: {
    '(click)': 'open()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Opener<C, T> implements OnDestroy {
  readonly #dialog = inject(MatDialog);
  readonly #refs: MatDialogRef<C>[] = [];

  readonly value = input<string | null>();
  readonly component = input.required<Type<C>>();
  readonly config = input<MatDialogConfig<T>>({});

  /** @inheritdoc */
  ngOnDestroy(): void {
    for (const ref of this.#refs) {
      ref.close();
    }
  }

  /**
   * Opens the dialog with the specified component and configuration.
   */
  open(): void {
    this.#refs.push(this.#dialog.open(this.component(), this.config()));
  }
}
