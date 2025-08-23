import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {
  transform(price: number | null | undefined): boolean | null {
    return price != null ? price > 0 : null;
  }
}
