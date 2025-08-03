import { Providable } from "./contracts";
import { Assembly } from "./assembly";
import { Purchase } from "./purchase";

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
 * Represents an index of materials used in assembly planning.
 */
export class Materials {
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
   * Sets the root assembly for this materials index.
   * @param assembly The root assembly for this materials index.
   * @throws Will throw an error if the root assembly is already set.
   */
  root(assembly: Assembly): void {
    this.#assembly ??= assembly;
    this.#index[assembly.entity.id] = assembly;
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
      this.#index[material.id] = purchase;
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
}
