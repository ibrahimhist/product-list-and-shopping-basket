import { catchError, map, switchMap } from 'rxjs/operators';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as ProductsActions from './products.action';

import { FakeApiService } from '@app/shared/services/fake-api.service';

/* Not:
Fake Api aslında http ile istek atıyormuşum gibi düşünebiliriz.
Alt yapıyı http ile atılıp dummy data şeklinde dönecek şekilde ayarlamadığım için, bu yolu kullandım.
*/

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
