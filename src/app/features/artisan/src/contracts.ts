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
 * Represents an object that can be persisted to the storage through abstract state.
 */
export interface Persistent<T> {
  /**
   * Gets the current state of the object.
   * @returns The state of the object retrieved.
   */
  getState(): T;

  /**
   * Sets the current state of the object.
   * @param state The new state to set.
   */
  setState(state: T): void;
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

/**
 * Represents an object that can be requested as contained within another object.
 * @template P The type of the parent object.
 * @template T The type of the contained object.
 */
export interface Containable<P, T> {
  /**
   * Requests the object of type T encapsulated by type P.
   * @param parent The parent object that contains the request.
   * @param materials The index of materials to associate with request.
   * @returns An instance of type T.
   */
  request(parent: P, materials: Materials): T;
}
