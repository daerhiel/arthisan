import { computed } from "@angular/core";

import { getItemRarity, isItemNamed, isMasterItem } from "@app/nw-data";
import { NwBuddy } from "./nw-buddy";

export class Craftable {
  readonly #item = computed(() => this.nw.items.get(this.id));

  readonly name = computed(() => {
    const name = this.#item()?.Name;
    return name ? this.nw.translate(name) : null;
  });
  readonly icon = computed(() => this.#item()?.IconPath);
  readonly rarity = computed(() => getItemRarity(this.#item()));
  readonly named = computed(() => {
    const item = this.#item();
    return isMasterItem(item) && isItemNamed(item);
  });

  constructor(protected readonly nw: NwBuddy, readonly id: string) {
  }
}

export function getIconInputs(item: Craftable) {
  return { path: item.icon(), name: item.name(), rarity: item.rarity(), named: item.named(), size: 12 };
}
