import { computed, effect, signal, Signal, untracked } from "@angular/core";

import { comparer, greater, ObjectMap } from "@app/core";

/**
 * A function that translates a given key using optional prefixes.
 */
export type TranslateFn<T> = (key: T) => T;

type IndexerFn<T> = (item: T) => string;
type EvaluatorFn<T> = (item: T) => number | null;

/**
 * Represents a grouping of items based on a specific key.
 */
export class Grouping<T> {
  readonly #items = new Set<T>();
  readonly #indexer: IndexerFn<T>;
  readonly #evaluator: EvaluatorFn<T>;

  /**
   * The computed value of the grouping based on the evaluator function.
   */
  readonly value = computed(() => {
    let value = null;
    for (const item of this.#items) {
      if (greater(this.#evaluator(item), value)) {
        value = this.#evaluator(item);
      }
    }
    return value;
  });

  /**
   * Creates a new grouping.
   * @param id The unique identifier for the grouping.
   * @param name The display name for the grouping.
   * @param indexer The function used to determine the grouping key for each item.
   * @param evaluator The function used to evaluate the value of the grouping.
   */
  constructor(readonly id: string, readonly name: string, indexer: IndexerFn<T>, evaluator: EvaluatorFn<T>) {
    if (!id) {
      throw new Error('Id is required.');
    }
    if (!name) {
      throw new Error('Name is required.');
    }
    if (!indexer) {
      throw new Error('Indexer is required.');
    }
    if (!evaluator) {
      throw new Error('Evaluator is required.');
    }

    this.#indexer = indexer;
    this.#evaluator = evaluator;
  }

  /**
   * Adds an item to the grouping.
   * @param item The item to add.
   */
  add(item: T): void {
    if (!item) {
      throw new Error('Invalid item instance.');
    }

    const id = this.#indexer(item);
    if (id !== this.id) {
      throw new Error(`Mismatching group ${this.id}: ${id}`);
    }

    this.#items.add(item);
  }
}

/**
 * Represents a set of groupings based on a collection of items.
 */
export class GroupingSet<T> {
  readonly #groups = new ObjectMap<Grouping<T>>();
  readonly #version = signal(0);
  readonly #indexer: IndexerFn<T>;
  readonly #translator: TranslateFn<string>;
  readonly #evaluator: EvaluatorFn<T>;

  readonly #handler = effect(() => {
    this.#groups.clear();

    for (const item of this.items()) {
      const key = this.#indexer(item);
      if (key) {
        let group = this.#groups.get(key);
        if (!group) {
          const name = this.#translator(key) ?? key
          group = new Grouping(key, name, this.#indexer, this.#evaluator);
          this.#groups.set(key, group);
        }
        group.add(item);
      }
    }

    this.#version.set(untracked(() => this.#version()) + 1);
  });

  /**
   * The computed list of groupings sorted by their evaluated value.
   */
  readonly groups = computed(() => {
    this.#version();
    return Array.from(this.#groups.values()).sort((a, b) => comparer(b.value(), a.value()));
  });

  /**
   * Creates a new grouping set.
   * @param items The collection of items to group.
   * @param indexer The function used to determine the grouping key for each item.
   * @param translator The function used to translate the grouping keys.
   * @param evaluator The function used to evaluate the value of each grouping.
   */
  constructor(readonly items: Signal<T[]>, indexer: IndexerFn<T>, translator: TranslateFn<string>, evaluator: EvaluatorFn<T>) {
    if (!items) {
      throw new Error('Invalid items instance.');
    }
    if (!indexer) {
      throw new Error('Invalid indexer function.');
    }
    if (!translator) {
      throw new Error('Invalid translator function.');
    }
    if (!evaluator) {
      throw new Error('Invalid evaluator function.');
    }

    this.#indexer = indexer;
    this.#translator = translator;
    this.#evaluator = evaluator;
  }

  /**
   * Gets a grouping by its identifier.
   * @param id The identifier of the grouping.
   * @returns The grouping if found; otherwise, null.
   */
  get(id: string): Grouping<T> | null {
    this.#version();
    return this.#groups.get(id) ?? null;
  }

  /**
   * Destroys the index and releases any resources it holds.
   */
  destroy(): void {
    this.#handler.destroy();
  }
}
