import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from '@app/pages/products/shared/models/product.model';
import { ShoppingBasketProduct } from '../../shared/models/shopping-basket-product.model';
import { ShoppingBasketService } from '../../shared/services/shopping-basket.service';

@Component({
  selector: 'app-my-shopping-basket',
  templateUrl: './my-shopping-basket.component.html',
  styleUrls: ['./my-shopping-basket.component.scss'],
})
export class MyShoppingBasketComponent {
  myAddedProducts: Product[];
  mySummary: any;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private shoppingBasketService: ShoppingBasketService
  ) {
    this.getMyShoppingBasketProductList();
  }

  getMyShoppingBasketProductList(): void {
    this.shoppingBasketService.getMyShoppingBasketProductList().subscribe({
      next: (response: ShoppingBasketProduct[]) => {
        this.myAddedProducts = response || [];
        console.log(this.myAddedProducts);
      },
      error: (errorText) => {
        this.snackBar.open(errorText, 'Kapat', {
          duration: 2000,
        });
      },
    });
  }

  onClickContinueToShopping(): void {
    this.router.navigate(['/products']);
  }
}
