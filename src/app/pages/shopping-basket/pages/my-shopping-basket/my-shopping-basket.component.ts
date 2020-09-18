import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from '@app/pages/products/shared/models/product.model';
import { ShoppingBasketProduct } from '../../shared/models/shopping-basket-product.model';
import { ShoppingBasketSummary } from '../../shared/models/shopping-basket-summary.model';
import { ShoppingBasketService } from '../../shared/services/shopping-basket.service';

@Component({
  selector: 'app-my-shopping-basket',
  templateUrl: './my-shopping-basket.component.html',
  styleUrls: ['./my-shopping-basket.component.scss'],
})
export class MyShoppingBasketComponent {
  myAddedProducts: Product[];
  myShoppingBasketSummary: ShoppingBasketSummary;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private shoppingBasketService: ShoppingBasketService
  ) {
    this.getMyShoppingBasketProductList();
    this.getShoppingBasketSummary();
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

  addOneToProduct(shoppingBasketProduct: ShoppingBasketProduct): void {
    console.log(shoppingBasketProduct);
    this.changeBasketRuqestedQuantity(
      shoppingBasketProduct,
      shoppingBasketProduct.requestedQantity + 1
    );
  }

  deleteOneToProduct(shoppingBasketProduct: ShoppingBasketProduct): void {
    if (shoppingBasketProduct.requestedQantity === 1) {
      this.snackBar.open(
        '0 adetli bir ürün sepette bulunamaz, en az 1 adet olabilmeli.',
        'Kapat',
        {
          duration: 4000,
        }
      );
    } else {
      this.changeBasketRuqestedQuantity(
        shoppingBasketProduct,
        shoppingBasketProduct.requestedQantity - 1
      );
    }
  }

  changeBasketRuqestedQuantity(
    shoppingBasketProduct: ShoppingBasketProduct,
    requestedQuantity: number
  ): void {
    this.shoppingBasketService
      .changeBasketRuqestedQuantity(shoppingBasketProduct.id, requestedQuantity)
      .subscribe(
        (res) => {
          shoppingBasketProduct.requestedQantity = res.quantity;
          this.getShoppingBasketSummary();
        },
        (err) =>
          this.snackBar.open(err, 'Kapat', {
            duration: 2000,
          })
      );
  }

  clearProductFromList(shoppingBasketProduct: ShoppingBasketProduct): void {
    console.log(shoppingBasketProduct);

    this.shoppingBasketService
      .clearProductFromBasket(shoppingBasketProduct.id)
      .subscribe(
        (res) => {
          this.snackBar.open(
            'Ürün başarıyla sepetinizden çıkartılmıştır.',
            'Kapat',
            {
              duration: 2000,
            }
          );

          this.getMyShoppingBasketProductList();
          this.getShoppingBasketSummary();
        },
        (err) =>
          this.snackBar.open(err, 'Kapat', {
            duration: 2000,
          })
      );
  }

  getShoppingBasketSummary(): void {
    this.shoppingBasketService.getShoppingBasketSummary().subscribe(
      (res) => {
        this.myShoppingBasketSummary = res;

        console.log(this.myShoppingBasketSummary);
      },
      (err) =>
        this.snackBar.open(err, 'Kapat', {
          duration: 2000,
        })
    );
  }

  onClickContinueToShopping(): void {
    this.router.navigate(['/products']);
  }
}
