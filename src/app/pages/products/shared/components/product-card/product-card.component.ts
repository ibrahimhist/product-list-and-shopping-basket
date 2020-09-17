import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: Product;
  @Output() clickedToAddBasket: EventEmitter<Product> = new EventEmitter();
  @Input() callbackFunForAddingBasket?: (product: Product) => void;

  constructor() {}

  onClickAddToBasket(event: any): void {
    this.clickedToAddBasket.emit(this.product);
    if (this.callbackFunForAddingBasket) {
      this.callbackFunForAddingBasket(this.product);
    }
  }
}
