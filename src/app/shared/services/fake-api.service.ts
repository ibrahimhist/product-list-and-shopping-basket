import { Injectable } from '@angular/core';

import { Product } from 'src/app/pages/products/shared/models/product.model';
import { FakeDatabaseService } from './fake-database.service';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

import * as faker from 'faker/locale/tr';

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

  addToBasket(
    product: Product,
    quatity: number = 1
  ): Observable<{
    count: number;
  }> {
    let finalQuatity = 0;

    const addedProducts: {
      id: string;
      quatity: number;
    }[] = this.fakeDatabaseService.database.addedToBasketProducts;

    const foundProduct = addedProducts.find((x) => x.id === product.id);

    if (foundProduct) {
      foundProduct.quatity += quatity;
    } else {
      addedProducts.push({
        id: product.id,
        quatity,
      });
    }

    finalQuatity = addedProducts
      .map((x) => x.quatity)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    return of({ count: finalQuatity });
  }
}
