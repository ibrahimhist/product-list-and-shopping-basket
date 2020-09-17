import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingBasketRoutingModule } from './shopping-basket-routing.module';
import { MyShoppingBasketComponent } from './components/my-shopping-basket/my-shopping-basket.component';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';

@NgModule({
  declarations: [MyShoppingBasketComponent],
  imports: [CommonModule, ShoppingBasketRoutingModule, SharedModule],
})
export class ShoppingBasketModule {}
