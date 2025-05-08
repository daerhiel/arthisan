import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { Message, MessageType } from './message';

@Injectable({
  providedIn: 'root'
})
export class Broadcast implements OnDestroy {
  readonly #events = new Subject<Message<unknown>>();

  readonly events = this.#events.asObservable();

  /** @inheritdoc */
  ngOnDestroy(): void {
    this.#events.complete();
  }

  /**
   * Sends a message to the broadcast channel.
   * @param message The message to send.
   */
  send<T>(message: Message<T>): void {
    this.#events.next(message);
  }

  /**
   * Sends an exception message to the broadcast channel.
   * @param error The error to send.
   * @param timeout The timeout for the message.
   */
  exception(error: HttpErrorResponse, timeout = 12000): void {
    return this.send(new Message(MessageType.Error, error, timeout));
  }
}
