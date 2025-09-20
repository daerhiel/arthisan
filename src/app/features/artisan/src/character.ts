import { Signal, signal } from "@angular/core";

import { sum } from "@app/core";
import { CraftingTradeskill } from "@app/nw-data";
import { NwBuddy } from "@app/nw-buddy";
import { Blueprint } from "./blueprint";

type Settings<K extends string, T> = Readonly<Partial<Record<K, Signal<T>>>>;

export class Character {
  readonly #data: NwBuddy;

  readonly tradeskills: Settings<CraftingTradeskill, number> = {
    ['Arcana']: signal(250),
    ['Jewelcrafting']: signal(250),
    ['Leatherworking']: signal(250),
    ['Smelting']: signal(250),
    ['Stonecutting']: signal(250),
    ['Weaving']: signal(250),
    ['Woodworking']: signal(250),
  } as const;

  constructor(data: NwBuddy) {
    if (!data) {
      throw new Error("Invalid NW Buddy instance.");
    }
    this.#data = data;
  }

  /**
   * Calculates the yield bonus chance for a given blueprint.
   * @param blueprint The blueprint to evaluate.
   * @returns The yield bonus chance as a ratio.
   */
  getYieldBonusChance(blueprint: Blueprint): number {
    const tradeskill = blueprint.tradeskill;
    const level = this.tradeskills[tradeskill]?.() ?? 0;
    const skill = this.#data.tradeskills[tradeskill]?.get(level);
    let value = (skill?.RollBonus || 0) / 10000; // Skill roll bonus
    if (blueprint.hasYieldBonus && blueprint.isRefining) {
      value = sum(value, 0.0); // Faction yield bonus
    }
    return sum(value, 0.1); // Equipment bonus
  }
}
