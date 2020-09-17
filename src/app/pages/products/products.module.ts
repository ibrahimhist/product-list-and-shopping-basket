import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { ProductsMainComponent } from './pages/products-main/products-main.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { ProductListComponent } from './shared/components/product-list/product-list.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    ProductsMainComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
