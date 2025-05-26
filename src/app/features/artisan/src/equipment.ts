import { computed } from "@angular/core";

/**
 * Represents an equipment setup in the artisan system for the trading skill.
 */
export class Equipment {
  level = 250;

  readonly #chance = computed(() => {
    return this.base + this.level / 1000;
  });
  get chance(): number {
    return this.#chance();
  }

  /**
   * Creates a new Equipment instance.
   * @param base The base crafting bonus chance for the trading skill.
   */
  constructor(readonly base: number) {
  }
}
