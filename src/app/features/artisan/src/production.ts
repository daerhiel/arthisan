import { signal } from "@angular/core";

import { Assembly, AssemblyState } from "./assembly";
import { Persistent } from "./contracts";
import { Craftable } from "./craftable";
import { Materials, MaterialsOptions } from "./materials";

/**
 * Represents the state of an assembly.
 */
export interface ProductionState extends AssemblyState {
  requested: number;
}

/**
 * Represents a production order for a craftable item, extending assembly with requested volume.
 */
export class Production extends Assembly implements Persistent<ProductionState> {
  /** @inheritdoc */
  override readonly requested = signal(1);

  /**
   * Creates a new Production instance.
   * @param entity The craftable item to produce.
   * @param options The options to configure the materials instance.
   */
  constructor(entity: Craftable, options?: MaterialsOptions) {
    super(entity, new Materials(options));
  }

  /** @inheritdoc */
  override getState(): ProductionState {
    return {
      requested: this.requested(),
      ...super.getState()
    };
  }

  /** @inheritdoc */
  override setState(state: ProductionState): void {
    if (state) {
      super.setState(state);
      const requested = Number(state.requested);
      !isNaN(requested) && requested && this.requested.set(requested);
    }
  }
}
