import { Product } from '@app/pages/products/shared/models/product.model';
import { Action } from '@ngrx/store';
import { ShoppingBasketProduct } from '../shared/models/shopping-basket-product.model';
import { ShoppingBasketSummary } from '../shared/models/shopping-basket-summary.model';

export const ADD_PRODUCT = '[Shopping Basket] Add Product To Basket';
export const UPDATE_PRODUCT = '[Shopping Basket] Update Product';

export const SET_BASKETPRODUCTCOUNT =
  '[Shopping Basket] Set Basket Product Count';

export const FETCH_SOPPINGBASKETPRODUCTS =
  '[Shopping Basket] Fetch Basket Products';

export const SET_SOPPINGBASKETPRODUCTS =
  '[Shopping Basket] Set Basket Products';

export const FETCH_SOPPINGBASKETSUMMARY =
  '[Shopping Basket] Fetch Basket Summary';

export const SET_SOPPINGBASKETSUMMARY = '[Shopping Basket] Set Basket Summary';

export const UPDATE_PRODUCTREQUESTEDQUANTITY =
  '[Shopping Basket] Update Product Requested Quantity';

export const DELETE_PRODUCT = '[Shopping Basket] Delete Product From Basket';

export const COMPLETE_SHOPPINGBASKET =
  '[Shopping Basket] Complete Shopping Basket';

export const SET_SHOPPINGCOMPLETED = '[Shopping Basket] Shopping Completed';

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

export class FethShoppingBasketProducts implements Action {
  readonly type = FETCH_SOPPINGBASKETPRODUCTS;
}

export class SetShoppingBasketProducts implements Action {
  readonly type = SET_SOPPINGBASKETPRODUCTS;

  constructor(public payload: ShoppingBasketProduct[]) {}
}

export class FethShoppingBasketSummary implements Action {
  readonly type = FETCH_SOPPINGBASKETSUMMARY;
}

export class SetShoppingBasketSummary implements Action {
  readonly type = SET_SOPPINGBASKETSUMMARY;

  constructor(public payload: ShoppingBasketSummary) {}
}

export class UpdateProductRequestedQuantity implements Action {
  readonly type = UPDATE_PRODUCTREQUESTEDQUANTITY;

  constructor(
    public payload: { productId: string; requestedQuantity: number }
  ) {}
}

export class DeleteProduct implements Action {
  readonly type = DELETE_PRODUCT;

  constructor(public payload: string) {}
}

export class UpdateProduct implements Action {
  readonly type = UPDATE_PRODUCT;

  constructor(
    public payload: { productId: string; requestedQuantity: number }
  ) {}
}

export class CompleteShoppingBasket implements Action {
  readonly type = COMPLETE_SHOPPINGBASKET;
}

export class SetShoppingCompleted implements Action {
  readonly type = SET_SHOPPINGCOMPLETED;

  constructor(public payload: boolean) {}
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
  | FethShoppingBasketProducts
  | SetShoppingBasketProducts
  | FethShoppingBasketSummary
  | SetShoppingBasketSummary
  | DeleteProduct
  | UpdateProduct
  | CompleteShoppingBasket
  | SetShoppingCompleted
  | OnError
  | OnSuccess;
