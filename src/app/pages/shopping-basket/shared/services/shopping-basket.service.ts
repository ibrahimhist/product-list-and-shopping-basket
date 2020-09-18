import { Injectable } from '@angular/core';
import { FakeApiService } from '@app/shared/services/fake-api.service';
import { HeaderService } from '@app/shared/services/header.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { ShoppingBasketProduct } from '../models/shopping-basket-product.model';
import { ShoppingBasketSummary } from '../models/shopping-basket-summary.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingBasketService {
  constructor(
    private fakeApiService: FakeApiService,
    private headerService: HeaderService
  ) {}

  getMyShoppingBasketProductList(): Observable<ShoppingBasketProduct[]> {
    return this.fakeApiService.getMyShoppingBasketProductList();
  }

  getShoppingBasketSummary(): Observable<ShoppingBasketSummary> {
    return this.fakeApiService.getShoppingBasketSummary();
  }

  changeBasketRuqestedQuantity(
    id: string,
    quantity: number
  ): Observable<{ quantity: number }> {
    return this.fakeApiService.changeBasketRuqestedQuantity(id, quantity);
  }

  clearProductFromBasket(id: string): Observable<any> {
    return this.fakeApiService.clearProductFromBasket(id).pipe(
      map((x) => {
        this.headerService.setShoppingBasketProductCount(x.basketProductCount);
        return x;
      })
    );
  }
}
