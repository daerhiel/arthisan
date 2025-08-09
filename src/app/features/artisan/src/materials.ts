import { Persistent, Providable } from "./contracts";
import { Assembly } from "./assembly";
import { Purchase, PurchaseState } from "./purchase";

/**
 * Represents the assembly crafting optimization mode.
 */
export enum OptimizationMode {
  /**
   * Craft all items in a crafting schematics that can be crafted.
   */
  CraftAll
}

/**
 * Represents a material that can be requested for assembly planning.
 * @template T The type of the purchase to request.
 */
export interface Material<T> extends Providable<T> {
  readonly id: string;
  readonly name: string;
}

/**
 * Represents a crafting stage in the assembly planning process.
 */
export interface Stage {
  readonly id: string;
  readonly materials: Purchase[];
}

/**
 * Represents the state of the materials used in assembly planning.
 */
export interface MaterialsState {
  entities: Record<string, PurchaseState>;
}

/**
 * Represents the key used to store materials in local storage.
 */
export const MATERIALS_STORAGE_KEY = 'materials';

/**
 * Represents an index of materials used in assembly planning.
 */
export class Materials implements Persistent<MaterialsState> {
  readonly #index: Record<string, Purchase> = {};
  #assembly: Assembly | null = null;

  /**
   * The list of material ids in the material index.
   */
  get ids(): string[] {
    return Object.keys(this.#index);
  }

  /**
   * The root assembly for this materials index.
   */
  get assembly(): Assembly | null {
    return this.#assembly;
  }

  /**
   * Indexes a purchase for the specified material.
   * @param purchase The purchase to index.
   * @template T The type of the purchase to index.
   * @throws Will throw an error if the material is already indexed.
   */
  index<T extends Purchase>(purchase: T): void {
    if (!purchase) {
      throw new Error('Invalid purchase instance.');
    }
    const id = purchase.entity.id;
    if (id in this.#index && this.#index[id] !== purchase) {
      throw new Error(`Material is already indexed: ${id}.`);
    }
    this.#index[id] = purchase;
    if (purchase instanceof Assembly) {
      this.#assembly ??= purchase;
    }
  }

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
      this.index(purchase);
    }
    return purchase;
  }

  /**
   * Prepares the stages for assembly planning.
   * @returns An array of stages prepared from the root assembly.
   * @throws Will throw an error if the root assembly is not set.
   */
  prepare(): Stage[] {
    if (!this.#assembly) {
      throw new Error("Root assembly is not set.");
    }

    let id = 0;
    let last: Purchase[] = [this.#assembly];
    const stages: Stage[] = [{ id: 'assembly', materials: last }];

    while (last.length > 0) {
      const next: Purchase[] = [];
      for (const material of last) {
        if (material instanceof Assembly && material.crafted()) {
          const projection = material.projection;
          if (projection) {
            for (const provision of projection.provisions) {
              promote(provision.purchase, next);
            }
          }
        }
      }
      if (next.length > 0) {
        next.sort((a, b) => {
          const ta = a instanceof Assembly;
          const tb = b instanceof Assembly;
          return Number(tb) - Number(ta);
        });
        stages.push({ id: `stage-${++id}`, materials: next });
      }
      last = next;
    }

    return stages;

    function promote(purchase: Purchase, materials: Purchase[]): void {
      for (const stage of stages) {
        const index = stage.materials.indexOf(purchase);
        if (index >= 0) {
          stage.materials.splice(index, 1);
        }
      }
      if (!materials.includes(purchase)) {
        materials.push(purchase);
      }
    }
  }

  /**
   * Optimizes the assembly based on the specified optimization criteria.
   * @param mode The optimization mode to apply.
   */
  optimize(mode: OptimizationMode) {
    switch (mode) {
      case OptimizationMode.CraftAll:
        for (const id in this.#index) {
          const purchase = this.#index[id];
          if (purchase instanceof Assembly) {
            purchase.crafted.set(true);
          }
        }
        break;
      default:
        throw new Error(`Unsupported optimization mode: ${mode}`);
    }
  }

  /** @inheritdoc */
  getState(): MaterialsState {
    const state: MaterialsState = {
      entities: {}
    };

    for (const id in this.#index) {
      const purchase = this.#index[id].getState();
      if (purchase) {
        state.entities[id] = purchase;
      }
    }

    return state;
  }

  /** @inheritdoc */
  setState(state: MaterialsState): void {
    if (!state) {
      return;
    }

    for (const id in state.entities) {
      const purchase = this.#index[id];
      if (purchase) {
        purchase.setState(state.entities[id]);
      }
    }
  }
}
