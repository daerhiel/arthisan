import { Observable, Subject, switchMap } from "rxjs";

export class AsyncManager {
  readonly #tasks = new Map<string, Subject<void>>();
  #deferred = false;

  invoke<T>(id: string, stream: Observable<T>): Observable<T> {
    let async = stream;
    if (this.#deferred) {
      const source = new Subject<void>();
      async = source.pipe(switchMap(() => stream));
      this.#tasks.set(id, source);
    }
    return async;
  }

  defer(mode: boolean): void {
    this.#deferred = mode;
  }

  complete(...ids: string[]): void {
    for (const id of ids) {
      const task = this.#tasks.get(id);
      if (task) {
        task.next();
        task.complete();
        this.#tasks.delete(id);
      }
    }
  }

  completeAll(): void {
    for (const [id, task] of this.#tasks) {
      task.next();
      task.complete();
      this.#tasks.delete(id);
    }
  }
}
