import { effect, signal, untracked } from '@angular/core';

import { GetterFn, ObjectMap } from '@app/core';
import { ObjectCache } from './object-cache';

/**
 * Represents an object index that allows for efficient retrieval of objects based on a key.
 */
export class ObjectIndex<T> {
  readonly #objects = new ObjectMap<T[]>();
  readonly #version = signal(0);

  readonly #merge: () => number;
  readonly #handler = effect(() => {
    if (this.#merge()) {
      this.#version.set(untracked(() => this.#version()) + 1);
    }
  });

  /**
   * The version of the object index content.
   */
  readonly version = this.#version.asReadonly();

  /**
   * Creates an instance of the object index.
   * @param source The source object cache to index.
   * @param getter The function to get the key from the object.
   */
  constructor(source: ObjectCache<T>, getter: GetterFn<T, string[] | string>) {
    this.#merge = () => {
      let count = 0;

      for (const key of source.keys()) {
        const object = source.get(key);
        if (object) {
          let values = getter(object);
          if (typeof values === 'string') {
            values = [values];
          }
          for (const value of values ?? []) {
            let objects = this.#objects.get(value);
            if (!objects) {
              this.#objects.set(value, objects = []);
            }
            objects.push(object);
            count++;
          }
        }
      }

      return count;
    }
  }

  /**
   * Gets available keys from object index.
   * @returns The keys of the object index.
   */
  keys(): MapIterator<string> {
    this.version();
    return this.#objects.keys();
  }

  /**
   * Gets the object with the specified id.
   * @param id The id to get an object for.
   * @returns The object with the specified id; otherwise, null.
   */
  get(id: string): T[] | null {
    this.version();
    return this.#objects.get(id) ?? null;
  }

  /**
   * Destroys the index and releases any resources it holds.
   */
  destroy(): void {
    this.#handler.destroy();
  }
}
