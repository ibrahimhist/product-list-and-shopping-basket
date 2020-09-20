import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

import * as ShoppingBasketActions from './shopping-basket.actions';
import { of } from 'rxjs';
import { FakeApiService } from '@app/shared/services/fake-api.service';

const handleError = (errorMessage: string) => {
  return of(new ShoppingBasketActions.OnError(errorMessage));
};

/* Not:
Fake Api aslında http ile istek atıyormuşum gibi düşünebiliriz.
Alt yapıyı http ile atılıp dummy data şeklinde dönecek şekilde ayarlamadığım için, bu yolu kullandım.
*/

@Injectable()
export class ShoppingBasketEffects {
  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private fakeApiService: FakeApiService
  ) {}

  @Effect()
  addProduct = this.actions$.pipe(
    ofType(ShoppingBasketActions.ADD_PRODUCT),
    switchMap((addProductData: ShoppingBasketActions.AddProduct) => {
      return this.fakeApiService.addToBasket(addProductData.payload).pipe(
        // tap((resData) => {
        //   console.log(resData);
        // }),
        switchMap((resData: { basketProductCount: number }) => {
          return [
            new ShoppingBasketActions.SetBasketProductCount(
              resData.basketProductCount
            ),
            new ShoppingBasketActions.OnSuccess(
              'Ürün başarıyla sepetinize eklenmiştir.'
            ),
          ];
        }),
        catchError((errorRes) => {
          console.log(errorRes);
          return handleError(errorRes);
        })
      );
    })
  );

  @Effect()
  onError$ = this.actions$.pipe(
    ofType(ShoppingBasketActions.ON_ERROR),
    switchMap((onErrorData: ShoppingBasketActions.OnError) => {
      this.snackBar.open(onErrorData.payload, 'Kapat', {
        duration: 4000,
      });

      return of({ type: 'DUMMY' });
    })
  );

  @Effect()
  onSuccess$ = this.actions$.pipe(
    ofType(ShoppingBasketActions.ON_SUCCESS),
    switchMap((onSuccessData: ShoppingBasketActions.OnSuccess) => {
      this.snackBar.open(onSuccessData.payload, 'Kapat', {
        duration: 2000,
      });

      return of({ type: 'DUMMY' });
    })
  );
}
