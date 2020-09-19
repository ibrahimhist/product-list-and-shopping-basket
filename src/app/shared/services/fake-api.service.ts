import { Injectable } from '@angular/core';

import { Product } from 'src/app/pages/products/shared/models/product.model';
import { FakeDatabaseService } from './fake-database.service';

import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

import * as faker from 'faker/locale/tr';
import { ShoppingBasketProduct } from '@app/pages/shopping-basket/shared/models/shopping-basket-product.model';
import { ShoppingBasketSummary } from '@app/pages/shopping-basket/shared/models/shopping-basket-summary.model';

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
      requestedQuatity: number;
    }[] = this.fakeDatabaseService.database.addedToBasketProducts;

    const shoppingBasketProductList: ShoppingBasketProduct[] = [];
    addedProducts.forEach((addedProduct) => {
      const foundProduct = this.fakeDatabaseService.database.products.find(
        (x) => x.id === addedProduct.id
      );

      if (foundProduct) {
        shoppingBasketProductList.push({
          ...foundProduct,
          requestedQantity: addedProduct.requestedQuatity,
          shipmmentDate: 'Yarın kargoda',
        });
      }
    });

    return of(shoppingBasketProductList);
  }

  private isRequestedQuantityGreaterThanAvailableQuantity(
    productId: string,
    requestedQantity: number
  ): boolean {
    const foundProduct = this.fakeDatabaseService.database.products.find(
      (x) => x.id === productId
    );
    let isGreater = false;

    if (foundProduct && requestedQantity > foundProduct.quantity) {
      isGreater = true;
    }

    return isGreater;
  }

  addToBasket(
    product: Product
  ): Observable<{
    basketProductCount: number;
  }> {
    const addedProducts: {
      id: string;
      requestedQuatity: number;
    }[] = this.fakeDatabaseService.database.addedToBasketProducts;

    const foundAddedProduct = addedProducts.find((x) => x.id === product.id);
    const foundProduct = this.fakeDatabaseService.database.products.find(
      (x) => x.id === product.id
    );

    if (foundAddedProduct) {
      if (
        this.isRequestedQuantityGreaterThanAvailableQuantity(
          product.id,
          foundAddedProduct.requestedQuatity + 1
        )
      ) {
        return throwError('Maksimum limite ulaştınız.');
      } else {
        foundAddedProduct.requestedQuatity += 1;
      }
    } else {
      addedProducts.push({
        id: product.id,
        requestedQuatity: 1,
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
    const foundAddedProduct = this.fakeDatabaseService.database.addedToBasketProducts.find(
      (x) => x.id === id
    );

    if (!foundAddedProduct) {
      return throwError('Ürün bulunmamaktadır.');
    } else {
      if (this.isRequestedQuantityGreaterThanAvailableQuantity(id, quantity)) {
        return throwError('Maksimum limite ulaştınız.');
      } else {
        foundAddedProduct.requestedQuatity = quantity;
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

  getShoppingBasketSummary(): Observable<ShoppingBasketSummary> {
    let totalPayment = 0;
    const addedToBasketProducts = this.fakeDatabaseService.database
      .addedToBasketProducts;
    addedToBasketProducts.forEach((item) => {
      const foundProduct = this.fakeDatabaseService.database.products.find(
        (x) => x.id === item.id
      );
      if (foundProduct) {
        totalPayment +=
          parseInt(foundProduct.price as any, 10) * item.requestedQuatity;
      }
    });

    return of(
      addedToBasketProducts.length > 0
        ? {
            productCount: addedToBasketProducts.length,
            totalPayment,
          }
        : null
    );
  }
}
