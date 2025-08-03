function transform(key: string): string {
  return key?.toLowerCase();
}

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
