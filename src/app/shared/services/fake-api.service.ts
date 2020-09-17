import { Injectable } from '@angular/core';

import { Product } from 'src/app/pages/products/shared/models/product.model';
import { FakeDatabaseService } from './fake-database.service';

import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

import * as faker from 'faker/locale/tr';
import { ShoppingBasketProduct } from '@app/pages/shopping-basket/shared/models/shopping-basket-product.model';

@Injectable({
  providedIn: 'root',
})
export class FakeApiService {
  constructor(private fakeDatabaseService: FakeDatabaseService) {}

  getProductList(): Observable<Product[]> {
    return of([...this.fakeDatabaseService.database.products])
      .pipe
      // delay(faker.random.number(3000))
      ();
  }

  getMyShoppingBasketProductList(): Observable<ShoppingBasketProduct[]> {
    const addedProducts: {
      id: string;
      quatity: number;
    }[] = this.fakeDatabaseService.database.addedToBasketProducts;

    const shoppingBasketProductList: ShoppingBasketProduct[] = [];
    addedProducts.forEach((addedProduct) => {
      const foundProduct = this.fakeDatabaseService.database.products.find(
        (x) => x.id === addedProduct.id
      );

      if (foundProduct) {
        shoppingBasketProductList.push({
          ...foundProduct,
          requestedQantity: addedProduct.quatity,
          shipmmentDate: 'Yarın kargoda',
        });
      }
    });

    return of(shoppingBasketProductList);
  }

  addToBasket(
    product: Product,
    quatity: number = 1
  ): Observable<{
    count: number;
  }> {
    let finalWholeProductsQuatity = 0;

    const addedProducts: {
      id: string;
      quatity: number;
    }[] = this.fakeDatabaseService.database.addedToBasketProducts;

    const foundProduct = addedProducts.find((x) => x.id === product.id);

    if (foundProduct) {
      if (foundProduct.quatity + quatity > 25) {
        return throwError('Maksimum limite ulaştınız.');
      } else {
        foundProduct.quatity += quatity;
      }
    } else {
      addedProducts.push({
        id: product.id,
        quatity,
      });
    }

    finalWholeProductsQuatity = addedProducts
      .map((x) => x.quatity)
      .reduce((accumulator, currentValue) => accumulator + currentValue);

    return of({ count: finalWholeProductsQuatity });
  }
}
