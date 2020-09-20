import { catchError, map, switchMap } from 'rxjs/operators';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as ProductsActions from './products.action';

import { FakeApiService } from '@app/shared/services/fake-api.service';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private fakeApiService: FakeApiService
  ) {}

  @Effect()
  fetchProducts = this.actions$.pipe(
    ofType(ProductsActions.FETCH_PRODUCTS),
    switchMap(() => {
      return this.fakeApiService.getProductList();
    }),
    map((products) => {
      return new ProductsActions.SetProducts(products);
    })
  );
}
