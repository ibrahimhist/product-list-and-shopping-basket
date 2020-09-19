import { Injectable } from '@angular/core';
import { HeaderService } from '@app/shared/services/header.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { FakeApiService } from 'src/app/shared/services/fake-api.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private fakeApiService: FakeApiService,
    private headerService: HeaderService
  ) {}

  getProductList(): Observable<Product[]> {
    return this.fakeApiService.getProductList();
  }

  addToBasket(
    product: Product
  ): Observable<{
    basketProductCount: number;
  }> {
    return this.fakeApiService.addToBasket(product).pipe(
      map((x) => {
        this.headerService.setShoppingBasketProductCount(x.basketProductCount);
        return x;
      })
    );
  }
}
