import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from '@app/pages/products/shared/models/product.model';
import { Store } from '@ngrx/store';
import { ShoppingBasketProduct } from '../../shared/models/shopping-basket-product.model';
import { ShoppingBasketSummary } from '../../shared/models/shopping-basket-summary.model';
import { ShoppingBasketService } from '../../shared/services/shopping-basket.service';

import * as fromProducts from 'src/app/pages/products/store/products.reducer';
import * as fromApp from 'src/app/store/app.reducer';

import * as ShoppingBasketActions from 'src/app/pages/shopping-basket/store/shopping-basket.actions';
import * as fromShoppingBasket from 'src/app/pages/shopping-basket/store/shopping-basket.reducer';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-my-shopping-basket',
  templateUrl: './my-shopping-basket.component.html',
  styleUrls: ['./my-shopping-basket.component.scss'],
})
export class MyShoppingBasketComponent implements OnInit, OnDestroy {
  myAddedProducts: Product[];
  myShoppingBasketSummary: ShoppingBasketSummary;

  isShoppingCompleted: boolean;

  // shoppingBasket: Observable<fromShoppingBasket.State>;

  shoppingBasketSubs: Subscription;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private shoppingBasketService: ShoppingBasketService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.shoppingBasketSubs = this.store
      .select('shoppingBasket')
      .subscribe((data) => {
        this.myAddedProducts = data.shoppingBasketProducts;
        this.myShoppingBasketSummary = data.shoppingBasketSummary;
        this.isShoppingCompleted = data.shoppingCompleted;
      });

    this.getMyShoppingBasketProductList();
    this.getShoppingBasketSummary();
  }

  getMyShoppingBasketProductList(): void {
    // this.shoppingBasketService.getMyShoppingBasketProductList().subscribe({
    //   next: (response: ShoppingBasketProduct[]) => {
    //     this.myAddedProducts = response || [];
    //     console.log(this.myAddedProducts);
    //   },
    //   error: (errorText) => {
    //     this.snackBar.open(errorText, 'Kapat', {
    //       duration: 2000,
    //     });
    //   },
    // });
    this.store.dispatch(new ShoppingBasketActions.FethShoppingBasketProducts());
  }

  getShoppingBasketSummary(): void {
    // this.shoppingBasketService.getShoppingBasketSummary().subscribe(
    //   (res) => {
    //     this.myShoppingBasketSummary = res;

    //     console.log(this.myShoppingBasketSummary);
    //   },
    //   (err) =>
    //     this.snackBar.open(err, 'Kapat', {
    //       duration: 2000,
    //     })
    // );
    this.store.dispatch(new ShoppingBasketActions.FethShoppingBasketSummary());
  }

  addOneToProduct(shoppingBasketProduct: ShoppingBasketProduct): void {
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
    // this.shoppingBasketService
    //   .changeBasketRuqestedQuantity(shoppingBasketProduct.id, requestedQuantity)
    //   .subscribe(
    //     (res) => {
    //       shoppingBasketProduct.requestedQantity = res.quantity;
    //       this.getShoppingBasketSummary();
    //     },
    //     (err) =>
    //       this.snackBar.open(err, 'Kapat', {
    //         duration: 2000,
    //       })
    //   );

    this.store.dispatch(
      new ShoppingBasketActions.UpdateProductRequestedQuantity({
        productId: shoppingBasketProduct.id,
        requestedQuantity,
      })
    );
  }

  clearProductFromList(shoppingBasketProduct: ShoppingBasketProduct): void {
    // this.shoppingBasketService
    //   .clearProductFromBasket(shoppingBasketProduct.id)
    //   .subscribe(
    //     (res) => {
    //       this.snackBar.open(
    //         'Ürün başarıyla sepetinizden çıkartılmıştır.',
    //         'Kapat',
    //         {
    //           duration: 2000,
    //         }
    //       );

    //       this.getMyShoppingBasketProductList();
    //       this.getShoppingBasketSummary();
    //     },
    //     (err) =>
    //       this.snackBar.open(err, 'Kapat', {
    //         duration: 2000,
    //       })
    //   );

    this.store.dispatch(
      new ShoppingBasketActions.DeleteProduct(shoppingBasketProduct.id)
    );
  }

  onClickContinueToShopping(): void {
    this.router.navigate(['/products']);
  }

  onClickCompleteShopping(): void {
    // this.shoppingBasketService.completeShopping().subscribe(
    //   (res) => {
    //     this.isShoppingCompleted = true;
    //     this.snackBar.open(
    //       'Alışverişiniz tamamlanmıştır. İyi alışverişler dileriz.',
    //       'Kapat',
    //       {
    //         duration: 5000,
    //       }
    //     );
    //   },
    //   (err) =>
    //     this.snackBar.open(err, 'Kapat', {
    //       duration: 2000,
    //     })
    // );

    this.store.dispatch(new ShoppingBasketActions.CompleteShoppingBasket());
  }

  ngOnDestroy(): void {
    if (this.shoppingBasketSubs) {
      this.shoppingBasketSubs.unsubscribe();
    }
  }
}
