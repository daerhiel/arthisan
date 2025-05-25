import { computed } from '@angular/core';

import { defineColumn, subtract, sum } from '@app/core';
import { ItemType } from '@app/nw-data';
import { getPriceInputs, NwPrice } from '@app/nw-buddy';
import { Blueprint } from './blueprint';
import { Provision } from './provision';

const unsupported: ItemType[] = ['Weapon', 'Armor', 'HousingItem'];

export class Projection {
  readonly provisions: Provision[];

  readonly #cost = computed(() =>
    this.provisions.reduce((s: number | null, x) => sum(s, x.cost), null)
  );
  get cost(): number | null {
    return this.#cost();
  }

  readonly #profit = computed(() =>
    subtract(this.blueprint.item.price(), this.cost)
  );
  get profit(): number | null {
    return this.#profit();
  }

  readonly #chance = computed(() => {
    const type = this.blueprint.item.type();
    if (!type || !unsupported.includes(type)) {
      const chance = this.provisions.reduce((s, x) => sum(s, x.chance), this.blueprint.chance);
      return Math.max(chance, 0);
    }
    return null;
  });
  get chance(): number | null {
    return this.#chance();
  }

  constructor(readonly blueprint: Blueprint) {
    if (!blueprint) {
      throw new Error('Invalid blueprint instance.');
    }
    this.provisions = blueprint.ingredients.map(ingredient => new Provision(ingredient));
  }
}

function getPriceState(projection: Projection): boolean | null {
  const profit = projection.profit;
  return profit ? profit > 0 : null;
}

export const projectionCost = defineColumn<Projection>({
  id: 'cost',
  displayName: 'Cost',
  width: '5%',
  align: 'right',
  value: { component: NwPrice, map: getPriceInputs(x => x.cost) }
});

export const projectionProfit = defineColumn<Projection>({
  id: 'profit',
  displayName: 'Profit',
  width: '5%',
  align: 'right',
  value: { component: NwPrice, map: getPriceInputs(x => x.profit, getPriceState) }
});

export const projectionChance = defineColumn<Projection>({
  id: 'chance',
  displayName: 'Chance',
  width: '5%',
  align: 'right',
  value: { fit: x => x.chance }
});
