import { inject, Injectable, OnDestroy } from '@angular/core';

import { ObjectCache, CollectionCache, ArrayCache, ObjectIndex } from '@app/core';
import { CraftingTradeskill, DATASHEETS, TradeskillRankData } from '@app/nw-data';
import { NwBuddyApi } from './nw-buddy-api';

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

  /**
   * The tradeskill rank data.
   */
  readonly tradeskills: Record<CraftingTradeskill, ArrayCache<TradeskillRankData>> = {
    Arcana: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Arcana), item => item.Level),
    Armoring: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Armoring), item => item.Level),
    Cooking: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Cooking), item => item.Level),
    Engineering: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Engineering), item => item.Level),
    Fishing: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Fishing), item => item.Level),
    Furnishing: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Furnishing), item => item.Level),
    Harvesting: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Harvesting), item => item.Level),
    Jewelcrafting: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Jewelcrafting), item => item.Level),
    Leatherworking: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Leatherworking), item => item.Level),
    Logging: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Logging), item => item.Level),
    Mining: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Mining), item => item.Level),
    Musician: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Musician), item => item.Level),
    Skinning: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Skinning), item => item.Level),
    Smelting: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Smelting), item => item.Level),
    Stonecutting: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Stonecutting), item => item.Level),
    Weaponsmithing: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Weaponsmithing), item => item.Level),
    Weaving: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Weaving), item => item.Level),
    Woodworking: new ArrayCache(this.#api.getDataSheet(DATASHEETS.TradeskillRankData.Woodworking), item => item.Level)
  } as const;

  // test = effect(() => {
  //   this.dump('House_HousingItem_Lighting_CandleHolder_A')
  // });

  // dump(id: string): void {
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

  //     handle(id);

  //     console.log('items', items);
  //     console.log('housing', housing);
  //     console.log('recipes', recipes);
  //     console.log('categories', categories);
  //   }
  // }

  /** @inheritdoc */
  ngOnDestroy(): void {
    for (const key in this.tradeskills) {
      this.tradeskills[key as keyof typeof this.tradeskills]?.destroy();
    }
    this.ingredients.destroy();
    this.recipes.destroy();
    this.categories.destroy();
    this.housing.destroy();
    this.items.destroy();
  }
}
