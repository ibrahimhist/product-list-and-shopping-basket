import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@app/pages/products/shared/models/product.model';

@Component({
  selector: 'app-my-shopping-basket',
  templateUrl: './my-shopping-basket.component.html',
  styleUrls: ['./my-shopping-basket.component.scss'],
})
export class MyShoppingBasketComponent implements OnInit {
  myAddedProducts: Product[];
  mySummary: any;

  constructor(private router: Router) {
    this.myAddedProducts = [];
  }

  ngOnInit(): void {}

  onClickContinueToShopping(): void {
    this.router.navigate(['/products']);
  }
}
