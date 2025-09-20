import { computed, signal } from "@angular/core";

/**
 * Represents an equipment setup in the artisan system for the trading skill.
 */
export class Equipment {
  /**
   * The level of the trading skill.
   */
  readonly level = signal(250);

  /**
   * The cumulative chance to craft additional items for the crafting equipment.
   */
  get chance(): number {
    return this.#chance();
  }
  readonly #chance = computed(() =>
    this.base + this.level() / 1000
  );

  /**
   * Creates a new Equipment instance.
   * @param base The base crafting bonus chance for the trading skill.
   */
  constructor(readonly base: number) {
  }
}
