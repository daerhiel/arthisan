import { Providable } from "./contracts";
import { Purchase } from "./purchase";

/**
 * Represents a material that can be requested for assembly planning.
 * @template T The type of the purchase to request.
 */
export interface Material<T> extends Providable<T> {
  readonly id: string;
  readonly name: string;
}

/**
 * Represents an index of materials used in assembly planning.
 */
export class Materials {
  readonly #index: Record<string, Purchase> = {};

  /**
   * Requests a purchase for the specified material.
   * @param material The material to request.
   * @template T The type of the purchase to request.
   * @returns An instance of type T.
   */
  request<T extends Purchase>(material: Material<T>): T {
    let purchase = this.#index[material.id] as T;
    if (!purchase) {
      purchase = material.request(this);
      this.#index[material.id] = purchase;
    }
    return purchase;
  }
}
