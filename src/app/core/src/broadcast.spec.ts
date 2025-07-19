import { provideZonelessChangeDetection } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { TestBed } from '@angular/core/testing';

import { Message, MessageType } from './message';
import { Broadcast } from './broadcast';

describe('Broadcast', () => {
  let service: Broadcast;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(Broadcast);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a message when send is called', async () => {
    const message = new Message<string>(MessageType.Info, 'test');

    const result = firstValueFrom(service.events);
    service.send(message);
    expect(await result).toBe(message);
  });

  it('should emit exception message', async () => {
    const error = new HttpErrorResponse({ error: 'Test error' });
    const timeout = 5000;

    const result = firstValueFrom(service.events);
    service.exception(error, timeout);
    expect(await result).toEqual(new Message(MessageType.Error, error, timeout));
  });

  it('should emit exception message with default timeout', async () => {
    const error = new HttpErrorResponse({ error: 'Test error' });

    const result = firstValueFrom(service.events);
    service.exception(error);
    expect(await result).toEqual(new Message(MessageType.Error, error, 12000));
  });
});
