import { computed } from "@angular/core";

import { defineColumn, FitterFn, I18n } from "@app/core";
import { getItemRarity, isItemNamed, isMasterItem } from "@app/nw-data";
import { NwIcon, NwPrice } from "@app/nw-buddy";
import { Artisan } from "./artisan";
import { Blueprint } from "./blueprint";

export class Craftable {
  readonly #item = computed(() => this._artisan.data.items.get(this.id) ?? this._artisan.data.housing.get(this.id));
  readonly #recipes = computed(() => this._artisan.data.recipes.get(this.id));

  readonly name = computed(() => this.#item()?.Name ?? null);
  readonly icon = computed(() => this.#item()?.IconPath ?? null);
  readonly rarity = computed(() => getItemRarity(this.#item()));
  readonly named = computed(() => {
    const item = this.#item();
    return isMasterItem(item) && isItemNamed(item);
  });

  readonly category = computed(() => this.#item()?.TradingCategory ?? null);
  readonly family = computed(() => this.#item()?.TradingFamily ?? null);
  readonly type = computed(() => this.#item()?.ItemType ?? null);
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

export function getPriceInputs<R>(fitter: FitterFn<Craftable, R>) {
  return (item: Craftable, i18n: I18n) => {
    return { value: fitter(item, i18n) };
  }
}

export const columnIcon = defineColumn<Craftable>({
  id: 'icon',
  displayName: 'Icon',
  width: '0',
  value: { component: NwIcon, map: getIconInputs }
});

export const columnName = defineColumn<Craftable>({
  id: 'name',
  displayName: 'Name',
  width: '58%',
  value: { fit: (x, i18n) => {
    const name = x.name();
    return name ? i18n.get(name) : x.id;
  } }
});

export const columnCategory = defineColumn<Craftable>({
  id: 'category',
  displayName: 'Category',
  width: '7%',
  value: { fit: (x, i18n) => {
    const category = x.category();
    return category ? i18n.get(category, 'CategoryData') : null;
  } }
});

export const columnFamily = defineColumn<Craftable>({
  id: 'family',
  displayName: 'Family',
  width: '13%',
  value: { fit: (x, i18n) => {
    const family = x.family();
    return family ? i18n.get(family, 'CategoryData') : null;
  } }
});

export const columnType = defineColumn<Craftable>({
  id: 'type',
  displayName: 'Type',
  width: '10%',
  value: {
    fit: (x, i18n) => {
      const type = x.type();
      return type ? i18n.get(type, 'UI', 'UI_ItemTypeDescription') : null;
    }
  }
});

export const columnTier = defineColumn<Craftable>({
  id: 'tier',
  displayName: 'Tier',
  width: '5%',
  align: 'right',
  value: { fit: x => x.tier() }
});

export const columnPrice = defineColumn<Craftable>({
  id: 'price',
  displayName: 'Price',
  width: '5%',
  align: 'right',
  value: { component: NwPrice, map: getPriceInputs(x => x.price()) }
});

export const columnBlueprints = defineColumn<Craftable>({
  id: 'blueprints',
  displayName: 'Recipes',
  width: '2%',
  value: { fit: x => x.blueprints()?.length.toString() }
});
