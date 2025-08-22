import { signal } from "@angular/core";

import { Assembly, AssemblyState } from "./assembly";
import { Persistent } from "./contracts";

/**
 * Represents the state of an assembly.
 */
export interface ProductionState extends AssemblyState {
  requested: number;
}

export class Production extends Assembly implements Persistent<ProductionState> {
  /** @inheritdoc */
  override readonly requested = signal(1);

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
