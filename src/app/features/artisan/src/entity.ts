import { computed } from '@angular/core';

import { defineColumn } from '@app/core';
import { getItemRarity, isItemNamed, isMasterItem } from '@app/nw-data';
import { getPriceInputs, NwIcon, NwPrice } from '@app/nw-buddy';
import { Artisan } from './artisan';

/**
 * Represents an entity in the artisan system, which can be an item or housing.
 */
export class Entity {
  readonly #item = computed(() => this.artisan.data.items.get(this.id) ?? this.artisan.data.housing.get(this.id));

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

  readonly price = computed(() => this.artisan.gaming.get(this.id));

  /**
   * Creates a new Entity instance.
   * @param artisan The artisan instance that provides access to data.
   * @param id The unique identifier for the entity.
   * @throws Will throw an error if the artisan instance is invalid.
   */
  constructor(protected readonly artisan: Artisan, readonly id: string) {
    if (!artisan) {
      throw new Error('Invalid artisan instance.');
    }
  }
}

/**
 * Gets the inputs required for rendering an icon component for an entity item.
 * @param item The entity item for which to get icon inputs.
 * @returns An object containing the path, name, rarity, named status, and size for the icon.
 */
export function getIconInputs(item: Entity) {
  return { path: item.icon(), name: item.name(), rarity: item.rarity(), named: item.named(), size: 12 };
}

export const entityIcon = defineColumn<Entity>({
  id: 'icon',
  displayName: 'Icon',
  width: '0',
  value: { component: NwIcon, map: getIconInputs }
});

export const entityName = defineColumn<Entity>({
  id: 'name',
  displayName: 'Name',
  width: '48%',
  value: {
    fit: (x, i18n) => {
      const name = x.name();
      return name ? i18n.get(name) : x.id;
    }
  }
});

export const entityCategory = defineColumn<Entity>({
  id: 'category',
  displayName: 'Category',
  width: '7%',
  value: {
    fit: (x, i18n) => {
      const category = x.category();
      return category ? i18n.get(category, 'CategoryData') : null;
    }
  }
});

export const entityFamily = defineColumn<Entity>({
  id: 'family',
  displayName: 'Family',
  width: '13%',
  value: {
    fit: (x, i18n) => {
      const family = x.family();
      return family ? i18n.get(family, 'CategoryData') : null;
    }
  }
});

export const entityType = defineColumn<Entity>({
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

export const entityTier = defineColumn<Entity>({
  id: 'tier',
  displayName: 'Tier',
  width: '5%',
  align: 'right',
  value: { fit: x => x.tier() }
});

export const entityPrice = defineColumn<Entity>({
  id: 'price',
  displayName: 'Price',
  width: '5%',
  align: 'right',
  value: { component: NwPrice, map: getPriceInputs(x => x.price()) }
});
