import { Ingredient } from "./ingredient";

export class Provision {
  constructor(readonly ingredient: Ingredient) {
    if (!ingredient) {
      throw new Error('Invalid ingredient instance.');
    }
  }
}
