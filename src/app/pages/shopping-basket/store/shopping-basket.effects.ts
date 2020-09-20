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
  fetchShoppingBasketProducts = this.actions$.pipe(
    ofType(ShoppingBasketActions.FETCH_SOPPINGBASKETPRODUCTS),
    switchMap(() => {
      return this.fakeApiService.getMyShoppingBasketProductList().pipe(
        switchMap((resData) => {
          return [
            new ShoppingBasketActions.SetShoppingCompleted(false),
            new ShoppingBasketActions.SetShoppingBasketProducts(resData),
          ];
        }),
        catchError((errorRes) => {
          return handleError(errorRes);
        })
      );
    })
  );

  @Effect()
  fetchShoppingBasketSummary = this.actions$.pipe(
    ofType(ShoppingBasketActions.FETCH_SOPPINGBASKETSUMMARY),
    switchMap(() => {
      return this.fakeApiService.getShoppingBasketSummary().pipe(
        map((resData) => {
          return new ShoppingBasketActions.SetShoppingBasketSummary(resData);
        }),
        catchError((errorRes) => {
          return handleError(errorRes);
        })
      );
    })
  );

  @Effect()
  updateProductRequestedQuantity = this.actions$.pipe(
    ofType(ShoppingBasketActions.UPDATE_PRODUCTREQUESTEDQUANTITY),
    switchMap((data: ShoppingBasketActions.UpdateProductRequestedQuantity) => {
      return this.fakeApiService
        .changeBasketRuqestedQuantity(
          data.payload.productId,
          data.payload.requestedQuantity
        )
        .pipe(
          switchMap(() => {
            return [
              new ShoppingBasketActions.UpdateProduct({
                productId: data.payload.productId,
                requestedQuantity: data.payload.requestedQuantity,
              }),
              new ShoppingBasketActions.FethShoppingBasketSummary(),
            ];
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  deleteProduct = this.actions$.pipe(
    ofType(ShoppingBasketActions.DELETE_PRODUCT),
    switchMap((data: ShoppingBasketActions.DeleteProduct) => {
      return this.fakeApiService.clearProductFromBasket(data.payload).pipe(
        switchMap((resData: { basketProductCount: number }) => {
          return [
            new ShoppingBasketActions.FethShoppingBasketProducts(),
            new ShoppingBasketActions.FethShoppingBasketSummary(),
            new ShoppingBasketActions.SetBasketProductCount(
              resData.basketProductCount
            ),
            new ShoppingBasketActions.OnSuccess(
              'Ürün başarıyla sepetinizden çıkartılmıştır.'
            ),
          ];
        }),
        catchError((errorRes) => {
          return handleError(errorRes);
        })
      );
    })
  );

  @Effect()
  completeShoppingBasket = this.actions$.pipe(
    ofType(ShoppingBasketActions.COMPLETE_SHOPPINGBASKET),
    switchMap(() => {
      return this.fakeApiService.completeShopping().pipe(
        switchMap(() => {
          return [
            new ShoppingBasketActions.SetShoppingCompleted(true),
            new ShoppingBasketActions.SetBasketProductCount(0),
            new ShoppingBasketActions.OnSuccess(
              'Alışverişiniz tamamlanmıştır. İyi alışverişler dileriz.'
            ),
          ];
        }),
        catchError((errorRes) => {
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
