import { computed } from '@angular/core';

import { getItemRarity, HouseItems, isHousingItem, isItemNamed, isMasterItem, MasterItemDefinitions } from '@app/nw-data';
import { Artisan } from './artisan';
import { Deferrable } from './contracts';
import { Materials, Material } from './materials';
import { Purchase } from './purchase';

/**
 * Represents an entity in the artisan system, which can be a master item or housing.
 */
export class Entity implements Deferrable, Material<Purchase> {
  readonly #item: MasterItemDefinitions | HouseItems;
  readonly #id: string;

  get id() { return this.#id; }
  get name() { return this.#item.Name; }
  get icon() { return this.#item.IconPath; }
  get rarity() { return getItemRarity(this.#item); }
  get named() { return isMasterItem(this.#item) && isItemNamed(this.#item); }

  get category() { return this.#item.TradingCategory; }
  get family() { return this.#item.TradingFamily; }
  get type() { return this.#item.ItemType; }
  get tier() { return this.#item.Tier; }

  /**
   * The market price of a unit of an entity.
   */
  readonly #price = computed(() => this.artisan.gaming.get(this.id));
  get price(): number | null { return this.#price(); }

  /**
   * Creates a new Entity instance.
   * @param artisan The artisan instance that provides access to data.
   * @param item The master item or housing item for the entity.
   * @throws Will throw an error if the artisan instance is invalid.
   * @throws Will throw an error if the item data is invalid.
   */
  constructor(protected readonly artisan: Artisan, item: MasterItemDefinitions | HouseItems) {
    if (!artisan) {
      throw new Error('Invalid artisan instance.');
    }
    if (!item) {
      throw new Error('Invalid item data.');
    }

    this.#item = item;
    if (isMasterItem(item)) {
      this.#id = item.ItemID;
    } else if (isHousingItem(item)) {
      this.#id = item.HouseItemID;
    } else {
      throw new Error('Invalid item type for entity.');
    }
  }

  /** @inheritdoc */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialize(): void {
  }

  /** @inheritdoc */
  request(materials: Materials): Purchase {
    return new Purchase(this, materials);
  }
}

/**
 * Gets the inputs required for rendering an icon component for an entity.
 * @param entity The entity for which to get icon inputs.
 * @returns An object containing the path, name, rarity, named status, and size for the icon.
 */
export function getIconInputs<T extends Entity>(entity: T) {
  return { path: entity.icon, name: entity.name, rarity: entity.rarity, named: entity.named, size: 12 };
}
