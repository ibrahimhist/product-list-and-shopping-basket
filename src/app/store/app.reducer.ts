import { ActionReducerMap } from '@ngrx/store';

import * as fromProducts from '../pages/products/store/products.reducer';
export interface AppState {
  products: fromProducts.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  products: fromProducts.productsReducer,
};
