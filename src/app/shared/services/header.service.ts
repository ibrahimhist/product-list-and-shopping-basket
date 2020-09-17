import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private shoppingBasketProductCount: BehaviorSubject<
    number
  > = new BehaviorSubject(0);
  constructor() {}

  setShoppingBasketProductCount(productCount: number): void {
    this.shoppingBasketProductCount.next(productCount);
  }

  getShoppingBasketProductCount(): Observable<number> {
    return this.shoppingBasketProductCount.asObservable();
  }
}
