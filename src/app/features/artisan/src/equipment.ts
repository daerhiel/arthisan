import { computed } from "@angular/core";

export class Equipment {
  level = 250;

  readonly #chance = computed(() => {
    return this.base + this.level / 1000;
  });
  get chance(): number {
    return this.#chance();
  }

  constructor(readonly base: number) {
  }
}
