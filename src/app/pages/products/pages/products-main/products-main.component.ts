import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-products-main',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.scss'],
})
export class ProductsMainComponent implements OnInit {
  productExample: Product;
  productListExample: Product[] = [];

  callbackFunForAddingBasket: (product: Product) => void;

  constructor(private _snackBar: MatSnackBar) {
    this.productExample = {
      id: '1',
      title: 'Aptamil 7 Tahıllı Ballı 250 G',
      imageUrl:
        'https://migros-dali-storage-prod.global.ssl.fastly.net/sanalmarket/product/05046981/05046981-7b197a.jpg',
      price: 21.9,
      quantity: 10,
    };

    this.productListExample.push(this.productExample);
    this.productListExample.push(...this.productListExample);
    this.productListExample.push(...this.productListExample);
    this.productListExample.push(...this.productListExample);
    this.productListExample.push(...this.productListExample);

    this.callbackFunForAddingBasket = (product: Product) =>
      this.onClickAddBasket(product);
  }

  ngOnInit(): void {}

  onClickAddBasket(product: Product): void {
    console.log(product);
    console.log(this.productExample);

    this._snackBar.open('Ürün başarıyla sepetinize eklenmiştir.', 'Kapat');
  }
}
