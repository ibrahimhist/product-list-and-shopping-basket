import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingBasketService } from '@app/pages/shopping-basket/shared/services/shopping-basket.service';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.scss'],
})
export class ProductsMainComponent implements OnInit {
  productExample: Product;
  productListExample: Product[];

  callbackFunForAddingBasket: (product: Product) => void;

  constructor(
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private shoppingBasketService: ShoppingBasketService
  ) {
    this.callbackFunForAddingBasket = (product: Product) =>
      this.onClickAddBasket(product);

    this.getProductList();
  }

  getProductList(): void {
    this.productService.getProductList().subscribe({
      next: (productList: Product[]) => {
        this.productListExample = productList;
      },
      error: () => {},
    });
  }

  ngOnInit(): void {}

  onClickAddBasket(product: Product): void {
    console.log(product);
    console.log(this.productExample);

    this.shoppingBasketService.addToBasket(product.id).subscribe({
      next: (response: any) => {
        this.snackBar.open('Ürün başarıyla sepetinize eklenmiştir.', 'Kapat', {
          duration: 2000,
        });
      },
      error: (errorText) => {
        this.snackBar.open(errorText, 'Kapat', {
          duration: 2000,
        });
      },
    });
  }
}
