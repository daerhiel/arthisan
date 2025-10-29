import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transform a value into a boolean or number state.
 * @param value The input value.
 * @returns The transformed state.
 */
export function stateAttribute(value: unknown): boolean | number {
  if (typeof value === 'number' || typeof value === 'boolean') {
    return value;
  } else if (typeof value === 'string') {
    if (!isNaN(parseFloat(value)) && !isNaN(Number(value))) {
      return Number(value);
    }
  }
  return value != null && value !== 'false';
}


@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {
  transform(price: number | null | undefined): boolean | null {
    return price != null ? price > 0 : null;
  }
}
