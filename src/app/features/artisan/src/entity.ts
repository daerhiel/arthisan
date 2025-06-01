import { computed } from '@angular/core';

import { getItemRarity, isItemNamed, isMasterItem } from '@app/nw-data';
import { Artisan } from './artisan';
import { Materials } from './contracts';
import { Purchase } from './purchase';

/**
 * Represents an entity in the artisan system, which can be an item or housing.
 */
export class Entity implements Materials<Purchase> {
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

  /** @inheritdoc */
  request(): Purchase {
      return new Purchase(this);
  }
}

/**
 * Gets the inputs required for rendering an icon component for an entity.
 * @param item The entity for which to get icon inputs.
 * @returns An object containing the path, name, rarity, named status, and size for the icon.
 */
export function getIconInputs(item: Entity) {
  return { path: item.icon(), name: item.name(), rarity: item.rarity(), named: item.named(), size: 12 };
}
