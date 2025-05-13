import { computed, inject, Injectable } from '@angular/core';

import { TableDefinition } from '@app/core';
import { CraftingRecipeData, HouseItems, MasterItemDefinitions } from '@app/nw-data';
import { NwBuddy, NwI18n, NwIcon, NwPrice } from '@app/nw-buddy';
import { GamingTools } from '@app/gaming-tools';
import { Craftable, getIconInputs, getPriceInputs } from './craftable';

@Injectable({
  providedIn: 'root'
})
export class Artisan {
  readonly i18n = inject(NwI18n);
  readonly data = inject(NwBuddy);
  readonly gaming = inject(GamingTools);

  readonly craftables: TableDefinition<Craftable> = {
    name: 'recipes',
    columns: [
      { id: 'icon', displayName: 'Icon', width: '0', value: { component: NwIcon, inputs: getIconInputs } },
      { id: 'name', displayName: 'Name', width: '58%', value: { get: item => item.name() } },
      { id: 'category', displayName: 'Category', width: '7%', value: { get: item => item.category() } },
      { id: 'family', displayName: 'Family', width: '13%', value: { get: item => item.family() } },
      { id: 'type', displayName: 'Type', width: '10%', value: { get: item => item.type() } },
      { id: 'tier', displayName: 'Tier', width: '5%', align: 'right', value: { get: item => item.tier() } },
      { id: 'price', displayName: 'Price', width: '5%', align: 'right', value: { component: NwPrice, inputs: getPriceInputs(x => x.price()) } },
      { id: 'blueprints', displayName: 'Recipes', width: '2%', value: { get: item => item.blueprints()?.length.toString() } }
    ],
    data: computed(() => {
      const objects: Craftable[] = [];
      for (const key of this.data.recipes.keys() ?? []) {
        const item = this.data.items.get(key);
        if (item && item.ItemClass.includes('Resource') && item.ItemClass.includes('Gem')) {
          objects.push(new Craftable(this, key));
        }
      }
      return objects;
    })
  };
}
