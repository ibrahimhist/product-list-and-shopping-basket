import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyShoppingBasketComponent } from './components/my-shopping-basket/my-shopping-basket.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-shopping-basket',
    pathMatch: 'full',
  },
  {
    path: 'my-shopping-basket',
    component: MyShoppingBasketComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingBasketRoutingModule {}
