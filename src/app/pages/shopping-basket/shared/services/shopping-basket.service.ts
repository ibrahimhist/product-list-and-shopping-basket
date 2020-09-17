import { Injectable } from '@angular/core';
import { FakeApiService } from '@app/shared/services/fake-api.service';
import { Observable } from 'rxjs';
import { ShoppingBasketProduct } from '../models/shopping-basket-product.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingBasketService {
  constructor(private fakeApiService: FakeApiService) {}

  getMyShoppingBasketProductList(): Observable<ShoppingBasketProduct[]> {
    return this.fakeApiService.getMyShoppingBasketProductList();
  }
}
