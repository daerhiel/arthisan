import { signal, untracked } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';

import { ObjectMap } from '@app/core';

export type GetterFn<T, R> = (object: T) => R;

type HydrateFn<T> = (name: string, value: T) => void;
type IteratorFn<T> = (data: Record<string, T[]>) => void;

export abstract class CacheBase<T> {
  readonly #subscription: Subscription[] = [];
  readonly #version = signal(0);

  readonly version = this.#version.asReadonly();

  abstract has(id: string): boolean;

  abstract keys(): MapIterator<string>;

  protected _merge(hydrate: HydrateFn<T>): IteratorFn<T> {
    return data => {
      for (const [name, values] of Object.entries(data)) {
        for (const value of values ?? []) {
          hydrate(name, value);
        }
      }
      this.#version.set(untracked(() => this.#version()) + 1);
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
    this._subscribe(source.pipe(tap(this._merge((name, value) => {
      const key = getter(value);
      if (!key || key === 'DEFAULTS') {
        return;
      }
      if (!this.#objects.has(key)) {
        this.#objects.set(key, value);
      } else {
        console.warn(`Key found in ${name}: ${key}.`);
      }
    }))));
  }

  override has(id: string): boolean {
    this.version();
    return this.#objects.has(id);
  }

  override keys(): MapIterator<string> {
    this.version();
    return this.#objects.keys();
  }

  get(id: string): T | null {
    this.version();
    return this.#objects.get(id) ?? null;
  }
}

export class CollectionCache<T> extends CacheBase<T> {
  readonly #objects = new ObjectMap<T[]>();

  constructor(source: Observable<Record<string, T[]>>, getter: GetterFn<T, string>) {
    super();
    this._subscribe(source.pipe(tap(this._merge((_, value) => {
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

  override has(id: string): boolean {
    this.version();
    return this.#objects.has(id);
  }

  override keys(): MapIterator<string> {
    this.version();
    return this.#objects.keys();
  }

  get(id: string): T[] | null {
    this.version();
    return this.#objects.get(id) ?? null;
  }
}

export class ArrayCache<T> {
  readonly #subscription: Subscription[] = [];
  readonly #version = signal(0);
  readonly #objects = new Map<number, T>();

  readonly version = this.#version.asReadonly();

  protected _subscribe<T>(source: Observable<T>): void {
    this.#subscription.push(source.subscribe());
  }

  destroy(): void {
    while (this.#subscription.length) {
      this.#subscription.shift()?.unsubscribe();
    }
  }

  constructor(source: Observable<T[]>, getter: GetterFn<T, number>) {
    this._subscribe(source.pipe(tap(data => {
      for (const value of data ?? []) {
        const key = getter(value);
        if (key != null && !isNaN(key)) {
          this.#objects.set(key, value);
        }
      }
    })));
  }

  get(id: number): T | null {
    this.version();
    return this.#objects.get(id) ?? null;
  }
}
