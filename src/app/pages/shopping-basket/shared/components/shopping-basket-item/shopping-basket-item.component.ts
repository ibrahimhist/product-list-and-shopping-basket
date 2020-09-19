import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingBasketProduct } from '../../models/shopping-basket-product.model';

@Component({
  selector: 'app-shopping-basket-item',
  templateUrl: './shopping-basket-item.component.html',
  styleUrls: ['./shopping-basket-item.component.scss'],
})
export class ShoppingBasketItemComponent {
  @Input() shoppingBasketProduct: ShoppingBasketProduct;
  @Input() isReadOnly?: boolean;

  @Output() clickedAddOne: EventEmitter<
    ShoppingBasketProduct
  > = new EventEmitter();

  @Output() clickedDeleteOne: EventEmitter<
    ShoppingBasketProduct
  > = new EventEmitter();

  @Output() clickedClear: EventEmitter<
    ShoppingBasketProduct
  > = new EventEmitter();

  constructor(private snackBar: MatSnackBar) {}

  onClickAddOne(): void {
    this.clickedAddOne.emit(this.shoppingBasketProduct);
  }

  onClickDeleteOne(): void {
    this.clickedDeleteOne.emit(this.shoppingBasketProduct);
  }

  onClickClear(): void {
    this.clickedClear.emit(this.shoppingBasketProduct);
  }
}
