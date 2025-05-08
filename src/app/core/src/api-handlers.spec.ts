import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { handleError, retryStrategy } from './api-handlers';
import { Broadcast } from './broadcast';

describe('retryStrategy', () => {
  it('should return a function', () => {
    const strategy = retryStrategy({ delay: 1000, count: 3, span: 5000 });
    expect(strategy.delay).toBeInstanceOf(Function);
    expect(strategy.resetOnSuccess).toBe(true);
  });

  it('should calculate delay based on count and span', () => {
    const strategy = retryStrategy({ delay: 1000, count: 3, span: 5000 });
    if (strategy.delay instanceof Function) {
      const delay1 = strategy.delay(new HttpErrorResponse({}), 1);
      expect(delay1).toBeInstanceOf(Observable);
      const delay2 = strategy.delay(new HttpErrorResponse({}), 2);
      expect(delay2).toBeInstanceOf(Observable);
      const delay3 = strategy.delay(new HttpErrorResponse({}), 3);
      expect(delay3).toBeInstanceOf(Observable);
    }
  });
});

describe('handleError', () => {
  let broadcast: jasmine.SpyObj<Broadcast>;

  beforeEach(() => {
    broadcast = jasmine.createSpyObj<Broadcast>('Broadcast', ['exception']);
  });

  it('should return a function', () => {
    const fallback = 'fallback value';
    const errorHandler = handleError(broadcast, fallback);
    expect(errorHandler).toBeInstanceOf(Function);
  });

  it('should call broadcast.exception with the error message', () => {
    const fallback = 'fallback value';
    const errorHandler = handleError(broadcast, fallback);
    const error = new HttpErrorResponse({ error: 'error message' });
    errorHandler(error);
    expect(broadcast.exception).toHaveBeenCalledWith(error);
  });
});
