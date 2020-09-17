import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private productService: ProductService
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

    this.snackBar.open('Ürün başarıyla sepetinize eklenmiştir.', 'Kapat');
  }
}
