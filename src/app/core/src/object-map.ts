/**
 * Transforms a string key to a lower case string.
 * @param key The key to transform.
 * @returns The transformed key.
 */
function transform(key: string): string {
  return key?.toLowerCase();
}

/**
 * A function that gets a value from an object.
 */
export type GetterFn<T, R> = (object: T) => R;

export class ObjectMap<T> extends Map<string, T> {
  public override has(key: string): boolean {
    return super.has(transform(key));
  }

  public override get(key: string): T | undefined {
    return super.get(transform(key));
  }

  public override set(key: string, value: T): this {
    return super.set(transform(key), value);
  }

  public override delete(key: string): boolean {
    return super.delete(transform(key));
  }
}
