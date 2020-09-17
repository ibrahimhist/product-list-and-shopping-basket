import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingBasketRoutingModule } from './shopping-basket-routing.module';
import { MyShoppingBasketComponent } from './components/my-shopping-basket/my-shopping-basket.component';


@NgModule({
  declarations: [MyShoppingBasketComponent],
  imports: [
    CommonModule,
    ShoppingBasketRoutingModule
  ]
})
export class ShoppingBasketModule { }
