import { Product } from '../shared/models/product.model';
import * as ProductsActions from './products.action';

export interface State {
  products: Product[];
}

const initialState: State = {
  products: [],
};

export function productsReducer(
  state: State = initialState,
  action: ProductsActions.ProductsActions
) {
  switch (action.type) {
    case ProductsActions.SET_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
      };

    default:
      return state;
  }
}
