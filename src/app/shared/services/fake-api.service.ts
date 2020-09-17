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
    basketProductCount: number;
  }> {
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

    return of({ basketProductCount: addedProducts.length });
  }

  changeBasketRuqestedQuantity(
    id: string,
    quantity: number
  ): Observable<{
    quantity: number;
  }> {
    const foundProduct = this.fakeDatabaseService.database.products.find(
      (x) => x.id === id
    );

    if (!foundProduct) {
      return throwError('Ürün bulunmamaktadır.');
    } else {
      if (quantity > 25) {
        return throwError('Maksimum limite ulaştınız.');
      } else {
        foundProduct.quantity = quantity;
      }
    }

    return of({
      quantity,
    });
  }

  clearProductFromBasket(id: string) {
    const foundProductIndex = this.fakeDatabaseService.database.addedToBasketProducts.findIndex(
      (x) => x.id === id
    );

    if (foundProductIndex === -1) {
      return throwError('Ürün bulunmamaktadır.');
    } else {
      this.fakeDatabaseService.database.addedToBasketProducts.splice(
        foundProductIndex,
        1
      );
    }

    return of({
      basketProductCount: this.fakeDatabaseService.database
        .addedToBasketProducts.length,
    });
  }
}
