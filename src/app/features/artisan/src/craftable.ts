import { computed } from "@angular/core";

import { defineColumn, GetterFn } from "@app/core";
import { getItemRarity, isItemNamed, isMasterItem } from "@app/nw-data";
import { NwIcon, NwPrice } from "@app/nw-buddy";
import { Artisan } from "./artisan";
import { Blueprint } from "./blueprint";

export class Craftable {
  readonly #item = computed(() => this._artisan.data.items.get(this.id) ?? this._artisan.data.housing.get(this.id));
  readonly #recipes = computed(() => this._artisan.data.recipes.get(this.id));

  readonly name = computed(() => {
    const name = this.#item()?.Name;
    return name ? this._artisan.i18n.get(name) : this.id;
  });
  readonly icon = computed(() => this.#item()?.IconPath ?? null);
  readonly rarity = computed(() => getItemRarity(this.#item()));
  readonly named = computed(() => {
    const item = this.#item();
    return isMasterItem(item) && isItemNamed(item);
  });

  readonly category = computed(() => {
    const category = this.#item()?.TradingCategory;
    return category ? this._artisan.i18n.get(category, 'CategoryData') : null;
  });
  readonly family = computed(() => {
    const family = this.#item()?.TradingFamily;
    return family ? this._artisan.i18n.get(family, 'CategoryData') : null;
  });
  readonly type = computed(() => {
    const type = this.#item()?.ItemType;
    return type ? this._artisan.i18n.get(type, 'UI', 'UI_ItemTypeDescription') : null;
  });
  readonly tier = computed(() => this.#item()?.Tier ?? null);

  readonly price = computed(() => this._artisan.gaming.get(this.id));

  readonly blueprints = computed(() => this.#recipes()?.map(recipe =>
    new Blueprint(this._artisan, this, recipe)) ?? null
  );

  constructor(private readonly _artisan: Artisan, readonly id: string) {
    if (!_artisan) {
      throw new Error('Invalid artisan instance.');
    }
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

export const columnIcon = defineColumn<Craftable>({
  id: 'icon',
  displayName: 'Icon',
  width: '0',
  value: { component: NwIcon, inputs: getIconInputs }
});

export const columnName = defineColumn<Craftable>({
  id: 'name',
  displayName: 'Name',
  width: '58%',
  value: { get: x => x.name() }
});

export const columnCategory = defineColumn<Craftable>({
  id: 'category',
  displayName: 'Category',
  width: '7%',
  value: { get: x => x.category() }
});

export const columnFamily = defineColumn<Craftable>({
  id: 'family',
  displayName: 'Family',
  width: '13%',
  value: { get: x => x.family() }
});

export const columnType = defineColumn<Craftable>({
  id: 'type',
  displayName: 'Type',
  width: '10%',
  value: { get: x => x.type() }
});

export const columnTier = defineColumn<Craftable>({
  id: 'tier',
  displayName: 'Tier',
  width: '5%',
  align: 'right',
  value: { get: x => x.tier() }
});

export const columnPrice = defineColumn<Craftable>({
  id: 'price',
  displayName: 'Price',
  width: '5%',
  align: 'right',
  value: { component: NwPrice, inputs: getPriceInputs(x => x.price()) }
});

export const columnBlueprints = defineColumn<Craftable>({
  id: 'blueprints',
  displayName: 'Recipes',
  width: '2%',
  value: { get: x => x.blueprints()?.length.toString() }
});
