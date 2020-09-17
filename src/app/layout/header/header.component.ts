import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '@app/shared/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  productCount: number;
  productCountHidden: boolean;

  constructor(private router: Router, private headerService: HeaderService) {
    this.headerService
      .getShoppingBasketProductCount()
      .subscribe((productCount) => {
        this.productCount = productCount;
        this.productCountHidden = productCount === 0;
      });
  }

  ngOnInit(): void {}

  onClickCompanyName(): void {
    this.router.navigate(['/']);
  }

  onClickMyShoppingBasket(): void {
    this.router.navigate(['/shopping-basket/my-shopping-basket']);
  }
}
