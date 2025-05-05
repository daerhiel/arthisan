import { computed } from "@angular/core";

import { getItemRarity, isItemNamed, isMasterItem } from "@app/nw-data";
import { NwBuddy } from "./nw-buddy";

export class Craftable {
  readonly #item = computed(() => this.nw.items.get(this.id));

  readonly name = computed(() => this.nw.items.getName(this.id, x => x.Name));
  readonly icon = computed(() => this.nw.items.getValue(this.id, x => x.IconPath));
  readonly rarity = computed(() => getItemRarity(this.#item()));
  readonly named = computed(() => isMasterItem(this.#item()) && isItemNamed(this.#item()));

  constructor(protected readonly nw: NwBuddy, readonly id: string) {
  }
}

export function getIconInputs(item: Craftable) {
  return { path: item.icon(), name: item.name(), rarity: item.rarity(), named: item.named(), size: 12 };
}
