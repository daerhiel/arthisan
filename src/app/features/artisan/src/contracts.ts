/**
 * Represents an object that can be requested for assembly planning.
 * @template T The type of the object that can be provided.
 */
export interface Materials<T>
{
  /**
   * Provides the object of type T.
   * @returns An instance of type T.
   */
  request(): T;
}
