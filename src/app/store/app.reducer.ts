import { ActionReducerMap } from '@ngrx/store';

import * as fromProducts from '../pages/products/store/products.reducer';
import * as fromShoppingBasket from '../pages/shopping-basket/store/shopping-basket.reducer';
export interface AppState {
  products: fromProducts.State;
  shoppingBasket: fromShoppingBasket.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  products: fromProducts.productsReducer,
  shoppingBasket: fromShoppingBasket.shoppingBasketReducer,
};
