import { signal } from "@angular/core";

import { Assembly, AssemblyState } from "./assembly";
import { Persistent } from "./contracts";

/**
 * Represents the state of an assembly.
 */
export interface ProductionState extends AssemblyState {
  crafted: boolean;
}

export class Production extends Assembly implements Persistent<ProductionState> {
  override readonly requested = signal(1);
}
