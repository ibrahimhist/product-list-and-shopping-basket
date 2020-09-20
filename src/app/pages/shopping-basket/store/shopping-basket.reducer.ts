import * as ShoppingBasketActions from './shopping-basket.actions';

import { ShoppingBasketProduct } from '../shared/models/shopping-basket-product.model';
import { ShoppingBasketSummary } from '../shared/models/shopping-basket-summary.model';

export interface State {
  basketProductCount: number;

  shoppingBasketProducts: ShoppingBasketProduct[];
  shoppingBasketSummary: ShoppingBasketSummary;

  shoppingCompleted: boolean;

  successMsg: string;
  errorMsg: string;
}

const initialState: State = {
  basketProductCount: 0,

  shoppingBasketProducts: [],
  shoppingBasketSummary: null,

  shoppingCompleted: false,

  successMsg: null,
  errorMsg: null,
};

export function shoppingBasketReducer(
  state: State = initialState,
  action: ShoppingBasketActions.ShoppingBasketActions
) {
  switch (action.type) {
    case ShoppingBasketActions.SET_BASKETPRODUCTCOUNT:
      return {
        ...state,
        basketProductCount: action.payload,
      };
    case ShoppingBasketActions.SET_SOPPINGBASKETPRODUCTS:
      return {
        ...state,
        shoppingBasketProducts: [...action.payload],
      };
    case ShoppingBasketActions.SET_SOPPINGBASKETSUMMARY:
      return {
        ...state,
        shoppingBasketSummary: action.payload ? { ...action.payload } : null,
      };
    case ShoppingBasketActions.UPDATE_PRODUCT:
      const foundProductIndex = state.shoppingBasketProducts.findIndex(
        (x) => x.id === action.payload.productId
      );

      const updatedProduct = {
        ...state.shoppingBasketProducts[foundProductIndex],
        requestedQantity: action.payload.requestedQuantity,
      };

      const updatedShoppingBasketProducts = [...state.shoppingBasketProducts];
      updatedShoppingBasketProducts[foundProductIndex] = updatedProduct;

      return {
        ...state,
        shoppingBasketProducts: updatedShoppingBasketProducts,
      };
    case ShoppingBasketActions.SET_SHOPPINGCOMPLETED:
      return {
        ...state,
        shoppingCompleted: action.payload,
      };
    default:
      return state;
  }
}
