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

  /**
   * A unique identifier.
   */
  get id() {
    return this.#id;
  }

  /**
   * The display name resource id.
   */
  get name() {
    return this.#item.Name;
  }

  /**
   * The icon path.
   */
  get icon() {
    return this.#item.IconPath;
  }

  /**
   * The rarity class.
   */
  get rarity() {
    return getItemRarity(this.#item);
  }

  /**
   * Indicates whether the item is a named item.
   */
  get named() {
    return isMasterItem(this.#item) && isItemNamed(this.#item);
  }

  /**
   * The trading category.
   */
  get category() {
    return this.#item.TradingCategory;
  }

  /**
   * The trading family.
   */
  get family() {
    return this.#item.TradingFamily;
  }

  /**
   * The item type.
   */
  get type() {
    return this.#item.ItemType;
  }

  /**
   * The item tier.
   */
  get tier() {
    return this.#item.Tier;
  }

  /**
   * Indicates whether the item is bind on pickup.
   */
  get bindOnPickup() {
    return !!this.#item.BindOnPickup;
  }

  /**
   * The market price of a unit.
   */
  get price(): number | null {
    return this.#price();
  }
  readonly #price = computed(() =>
    !this.#item.BindOnPickup ? this.artisan.gaming.get(this.id) : null
  );

  /**
   * Creates a new Entity instance.
   * @param artisan The artisan instance that provides access to data.
   * @param item The master item or housing item for the entity.
   * @throws Will throw an error if the artisan instance is invalid.
   * @throws Will throw an error if the item data is invalid.
   */
  constructor(protected readonly artisan: Artisan, item: MasterItemDefinitions | HouseItems) {
    if (!artisan) {
      throw new Error('Invalid Artisan instance.');
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
