import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsMainComponent } from './pages/products-main/products-main.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
