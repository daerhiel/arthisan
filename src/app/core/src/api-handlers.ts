import { HttpErrorResponse } from "@angular/common/http";
import { Observable, of, RetryConfig, timer } from "rxjs";
import { Broadcast } from "./broadcast";

export function retryStrategy(config: { delay: number, count: number, span: number }): RetryConfig {
  return {
    delay: (e, count) => {
      const magnitude = count / config.count - 1;
      const iteration = count % config.count
      const delay = !iteration ? config.span * (1 + magnitude * .2) : config.delay;
      return timer(delay);
    },
    resetOnSuccess: true
  };
}

export function handleError<T>(broadcast: Broadcast, fallback: T): (e: HttpErrorResponse) => Observable<T> {
  return (e: HttpErrorResponse): Observable<T> => {
    broadcast.exception(e)
    return of(fallback);
  }
}
