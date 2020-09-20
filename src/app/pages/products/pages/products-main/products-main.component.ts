import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from '../../shared/models/product.model';
import { ShoppingBasketService } from '@app/pages/shopping-basket/shared/services/shopping-basket.service';

import * as ProductsActions from 'src/app/pages/products/store/products.action';
import * as ShoppingBasketActions from 'src/app/pages/shopping-basket/store/shopping-basket.actions';

import * as fromProducts from 'src/app/pages/products/store/products.reducer';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.scss'],
})
export class ProductsMainComponent implements OnInit {
  products: Observable<fromProducts.State>;

  productExample: Product;
  productListExample: Product[];

  callbackFunForAddingBasket: (product: Product) => void;

  constructor(
    private snackBar: MatSnackBar,
    private shoppingBasketService: ShoppingBasketService,
    private store: Store<fromApp.AppState>
  ) {
    this.callbackFunForAddingBasket = (product: Product) =>
      this.onClickAddBasket(product);
  }

  ngOnInit(): void {
    this.products = this.store.select('products');
    this.getProductList();
  }

  getProductList(): void {
    // this.productService.getProductList().subscribe({
    //   next: (productList: Product[]) => {
    //     this.productListExample = productList;
    //   },
    //   error: () => {},
    // });

    this.store.dispatch(new ProductsActions.FetchProducts());
  }

  onClickAddBasket(product: Product): void {
    console.log(product);
    console.log(this.productExample);

    // this.shoppingBasketService.addToBasket(product.id).subscribe({
    //   next: (response: any) => {
    //     this.snackBar.open('Ürün başarıyla sepetinize eklenmiştir.', 'Kapat', {
    //       duration: 2000,
    //     });
    //   },
    //   error: (errorText) => {
    //     this.snackBar.open(errorText, 'Kapat', {
    //       duration: 2000,
    //     });
    //   },
    // });

    this.store.dispatch(new ShoppingBasketActions.AddProduct(product.id));
  }
}
