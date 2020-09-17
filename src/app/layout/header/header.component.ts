import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '@app/shared/services/header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  productCount: number;
  productCountHidden: boolean;
  shoppingBasketProductCountSubs: Subscription;

  constructor(private router: Router, private headerService: HeaderService) {
    this.shoppingBasketProductCountSubs = this.headerService
      .getShoppingBasketProductCount()
      .subscribe((productCount) => {
        this.productCount = productCount;
        this.productCountHidden = productCount === 0;
      });
  }

  onClickCompanyName(): void {
    this.router.navigate(['/']);
  }

  onClickMyShoppingBasket(): void {
    this.router.navigate(['/shopping-basket/my-shopping-basket']);
  }

  ngOnDestroy(): void {
    if (this.shoppingBasketProductCountSubs) {
      this.shoppingBasketProductCountSubs.unsubscribe();
    }
  }
}
