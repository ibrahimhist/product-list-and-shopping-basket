import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '@app/shared/services/header.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromShoppingBasket from 'src/app/pages/shopping-basket/store/shopping-basket.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  productCount: number;
  productCountHidden: boolean;
  shoppingBasketProductCountSubs: Subscription;

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private store: Store<fromApp.AppState>
  ) {
    // this.shoppingBasketProductCountSubs = this.headerService
    //   .getShoppingBasketProductCount()
    //   .subscribe((productCount) => {
    //     this.productCount = productCount;
    //     this.productCountHidden = productCount === 0;
    //   });
  }

  ngOnInit(): void {
    this.shoppingBasketProductCountSubs = this.store
      .select('shoppingBasket')
      .subscribe((data: fromShoppingBasket.State) => {
        this.productCount = data.basketProductCount;
        this.productCountHidden = this.productCount === 0;
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
