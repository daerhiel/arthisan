import { signal } from "@angular/core";
import { Observable, Subscription, tap } from "rxjs";

import { ObjectMap } from "@app/core";

export type GetterFn<T, R> = (item: T) => R;

type HydrateFn<T> = (value: T) => void;
type IteratorFn<T> = (data: Record<string, T[]>) => void;

export abstract class CacheBase<T> {
  readonly #subscription: Subscription[] = [];
  readonly #version = signal(0);

  readonly version = this.#version.asReadonly();

  abstract keys(): MapIterator<string>;

  protected _merge(hydrate: HydrateFn<T>): IteratorFn<T> {
    return data => {
      for (const [, values] of Object.entries(data)) {
        for (const value of values ?? []) {
          hydrate(value);
        }
      }
      this.#version.set(this.#version() + 1);
    };
  }

  protected _subscribe<T>(source: Observable<T>): void {
    this.#subscription.push(source.subscribe());
  }

  destroy(): void {
    while (this.#subscription.length) {
      this.#subscription.shift()?.unsubscribe();
    }
  }
}

export class ObjectCache<T> extends CacheBase<T> {
  readonly #objects = new ObjectMap<T>();

  constructor(source: Observable<Record<string, T[]>>, getter: GetterFn<T, string>) {
    super();
    this._subscribe(source.pipe(tap(this._merge(value => {
      const key = getter(value);
      if (!key) {
        return;
      }
      if (!this.#objects.has(key)) {
        this.#objects.set(key, value);
      } else {
        console.warn(`Key found in ${name}: ${key}.`);
      }
    }))));
  }

  override keys(): MapIterator<string> {
    this.version();
    return this.#objects.keys();
  }

  get(id: string): T | null {
    this.version();
    const item = this.#objects.get(id);
    return item ?? null;
  }
}

export class CollectionCache<T> extends CacheBase<T> {
  readonly #objects = new ObjectMap<T[]>();

  constructor(source: Observable<Record<string, T[]>>, getter: GetterFn<T, string>) {
    super();
    this._subscribe(source.pipe(tap(this._merge(value => {
      const key = getter(value);
      if (!key) {
        return;
      }
      let objects = this.#objects.get(key);
      if (!objects) {
        this.#objects.set(key, objects = []);
      }
      objects.push(value);
    }))));
  }

  override keys(): MapIterator<string> {
    this.version();
    return this.#objects.keys();
  }

  get(id: string): T[] | null {
    this.version();
    const item = this.#objects.get(id);
    return item ?? null;
  }
}
