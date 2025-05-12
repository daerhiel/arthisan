import { inject, Injectable, OnDestroy } from '@angular/core';

import { DATASHEETS } from '@app/nw-data';
import { NwBuddyApi } from './nw-buddy-api';
import { ObjectCache, CollectionCache } from './object-cache';
import { ObjectIndex } from './object-index';

// import { effect } from '@angular/core';
// import { CraftingCategoryData, CraftingRecipeData, HouseItems, isHousingItem, isMasterItem, MasterItemDefinitions } from '@app/nw-data';

/**
 * Represents the NW Buddy module that provides New World database functionality.
 */
@Injectable({
  providedIn: 'root'
})
export class NwBuddy implements OnDestroy {
  readonly #api = inject(NwBuddyApi)

  /**
   * The item definitions data.
   */
  readonly items = new ObjectCache(
    this.#api.getDataSheets(DATASHEETS.MasterItemDefinitions),
    item => item.ItemID
  );

  /**
   * The house item definitions data.
   */
  readonly housing = new ObjectCache(
    this.#api.getDataSheets(DATASHEETS.HouseItems),
    item => item.HouseItemID
  );

  /**
   * The crafting category data.
   */
  readonly categories = new ObjectCache(
    this.#api.getDataSheets(DATASHEETS.CraftingCategoryData),
    item => item.CategoryID
  );

  /**
   * The crafting recipe data.
   */
  readonly recipes = new CollectionCache(
    this.#api.getDataSheets(DATASHEETS.CraftingRecipeData),
    item => item.ItemID
  );

  /**
   * The index of items by crafting categories.
   */
  readonly ingredients = new ObjectIndex(this.items, item => item.IngredientCategories);

  // test = effect(() => {
  //   const get = (id: string) => {
  //     return {
  //       item: this.items.get(id) ?? this.housing.get(id),
  //       recipes: this.recipes.get(id)
  //     };
  //   }
  //   if ([...this.items.keys()].length > 0 && [...this.recipes.keys()].length > 0) {
  //     const items: MasterItemDefinitions[] = [];
  //     const housing: HouseItems[] = [];
  //     const recipes: CraftingRecipeData[] = [];
  //     const categories: CraftingCategoryData[] = [];

  //     const handle = (id: string) => {
  //       const node = get(id);
  //       node.item && isMasterItem(node.item) && !items.some(x => x.ItemID === id) && items.push(node.item);
  //       node.item && isHousingItem(node.item) && !housing.some(x => x.HouseItemID === id) && housing.push(node.item);
  //       if (recipes) {
  //         for (const recipe of node.recipes ?? []) {
  //           recipe && !recipes.some(x => x.RecipeID === recipe.RecipeID) && recipes.push(recipe);
  //           const ids = [
  //             { id: recipe.Ingredient1, type: recipe.Type1 },
  //             { id: recipe.Ingredient2, type: recipe.Type2 },
  //             { id: recipe.Ingredient3, type: recipe.Type3 },
  //             { id: recipe.Ingredient4, type: recipe.Type4 },
  //             { id: recipe.Ingredient5, type: recipe.Type5 },
  //             { id: recipe.Ingredient6, type: recipe.Type6 },
  //             { id: recipe.Ingredient7, type: recipe.Type7 }
  //           ];
  //           for (const { id, type } of ids) {
  //             if (id && type === 'Item') {
  //               handle(id);
  //             } else if (id && type === 'Category_Only') {
  //               const category = this.categories.get(id);
  //               if (category && !categories.some(c => c.CategoryID === id)) {
  //                 categories.push(category);
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }

  //     handle('House_HousingItem_Lighting_CandleHolder_A');

  //     console.log('items', items);
  //     console.log('housing', housing);
  //     console.log('recipes', recipes);
  //     console.log('categories', categories);
  //   }
  // });

  /** @inheritdoc */
  ngOnDestroy(): void {
    this.items.destroy();
    this.recipes.destroy();
  }
}
