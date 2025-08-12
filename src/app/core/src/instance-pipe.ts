import { Pipe, PipeTransform, Type } from '@angular/core';

@Pipe({
  name: 'instance'
})
export class InstancePipe implements PipeTransform {
  transform<T>(value: unknown, target: Type<T>): value is T {
    return value instanceof target;
  }
}
