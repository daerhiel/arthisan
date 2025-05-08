import { computed } from "@angular/core";

import { GetterFn } from "@app/core";
import { getItemRarity, isItemNamed, isMasterItem } from "@app/nw-data";
import { Artisan } from "./artisan";

export class Craftable {
  readonly #item = computed(() => this.artisan.getItem(this.id));
  readonly #recipes = computed(() => this.artisan.getRecipes(this.id));

  readonly name = computed(() => {
    const name = this.#item()?.Name;
    return name ? this.artisan.translate(name) : null;
  });
  readonly icon = computed(() => this.#item()?.IconPath);
  readonly rarity = computed(() => getItemRarity(this.#item()));
  readonly named = computed(() => {
    const item = this.#item();
    return isMasterItem(item) && isItemNamed(item);
  });

  readonly category = computed(() => {
    const category = this.#item()?.TradingCategory;
    return category ? this.artisan.translate(category, 'categorydata') : null;
  });
  readonly family = computed(() => {
    const family = this.#item()?.TradingFamily;
    return family ? this.artisan.translate(family, 'categorydata') : null;
  });
  readonly type = computed(() => {
    const type = this.#item()?.ItemType;
    return type ? this.artisan.translate(type, 'ui', 'ui_itemtypedescription') : null;
  });
  readonly tier = computed(() => this.#item()?.Tier ?? null);

  readonly price = computed(() => {
    return this.artisan.getPrice(this.id);
  });

  readonly recipes = computed(() => {
    return this.#recipes().length;
  });

  constructor(protected readonly artisan: Artisan, readonly id: string) {
  }
}

export function getIconInputs(item: Craftable) {
  return { path: item.icon(), name: item.name(), rarity: item.rarity(), named: item.named(), size: 12 };
}

export function getPriceInputs<R>(getter: GetterFn<Craftable, R>) {
  return (item: Craftable) => {
    return { value: getter(item) };
  }
}
