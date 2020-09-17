import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingBasketRoutingModule } from './shopping-basket-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { MyShoppingBasketComponent } from './pages/my-shopping-basket/my-shopping-basket.component';
import { ShoppingBasketItemComponent } from './shared/components/shopping-basket-item/shopping-basket-item.component';
import { ShoppingBasketComponent } from './shared/components/shopping-basket/shopping-basket.component';
import { ShoppingBasketSummaryComponent } from './shared/components/shopping-basket-summary/shopping-basket-summary.component';

@NgModule({
  declarations: [MyShoppingBasketComponent, ShoppingBasketItemComponent, ShoppingBasketComponent, ShoppingBasketSummaryComponent],
  imports: [CommonModule, ShoppingBasketRoutingModule, SharedModule],
})
export class ShoppingBasketModule {}
