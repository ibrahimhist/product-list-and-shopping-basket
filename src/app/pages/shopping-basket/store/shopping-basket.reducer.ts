import { AddedToBasketProduct } from '@app/shared/services/fake-database.service';
import * as ShoppingBasketActions from './shopping-basket.actions';

export interface State {
  basketProductCount: number;

  successMsg: string;
  errorMsg: string;
}

const initialState: State = {
  basketProductCount: 0,

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
    default:
      return state;
  }
}
