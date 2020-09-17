import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShoppingBasketProduct } from '../../models/shopping-basket-product.model';

@Component({
  selector: 'app-shopping-basket',
  templateUrl: './shopping-basket.component.html',
  styleUrls: ['./shopping-basket.component.scss'],
})
export class ShoppingBasketComponent {
  @Input() shoppingBasketProductList: ShoppingBasketProduct[];

  @Output() clickedAddOne: EventEmitter<
    ShoppingBasketProduct
  > = new EventEmitter();

  @Output() clickedDeleteOne: EventEmitter<
    ShoppingBasketProduct
  > = new EventEmitter();

  @Output() clickedClear: EventEmitter<
    ShoppingBasketProduct
  > = new EventEmitter();

  @Output() clickedContinueToShopping: EventEmitter<any> = new EventEmitter();

  constructor() {}

  onClickContinueToShopping(event: any): void {
    this.clickedContinueToShopping.emit(event);
  }

  onClickedAddOne(data: ShoppingBasketProduct): void {
    this.clickedAddOne.emit(data);
  }

  onClickedDeleteOne(data: ShoppingBasketProduct): void {
    this.clickedDeleteOne.emit(data);
  }

  onClickedClear(data: ShoppingBasketProduct): void {
    this.clickedClear.emit(data);
  }
}
