import { Product } from '@app/pages/products/shared/models/product.model';
import { Action } from '@ngrx/store';

export const ADD_PRODUCT = '[Shopping Basket] Add Product To Basket';

export const SET_BASKETPRODUCTCOUNT =
  '[Shopping Basket] Set Basket Product Count';

export const ON_ERROR = '[Shopping Basket] On Error';
export const ON_SUCCESS = '[Shopping Basket] On Success';

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload: string) {}
}

export class SetBasketProductCount implements Action {
  readonly type = SET_BASKETPRODUCTCOUNT;

  constructor(public payload: number) {}
}

export class OnError implements Action {
  readonly type = ON_ERROR;

  constructor(public payload: string) {}
}

export class OnSuccess implements Action {
  readonly type = ON_SUCCESS;

  constructor(public payload: string) {}
}

export type ShoppingBasketActions =
  | AddProduct
  | SetBasketProductCount
  | OnError
  | OnSuccess;
