import { Materials } from "./materials";

/**
 * Represents an object that can be deferred for initialization.
 */
export interface Deferrable {
  /**
   * Initializes the instance of an object.
   */
  initialize(): void;
}

/**
 * Represents an object that can be requested for assembly planning.
 * @template T The type of the object that can be provided.
 */
export interface Providable<T> {
  /**
   * Provides the object of type T.
   * @param materials The index of materials to associate with request.
   * @returns An instance of type T.
   */
  request(materials: Materials): T;
}
