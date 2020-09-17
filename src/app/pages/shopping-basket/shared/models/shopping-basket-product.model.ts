import { Product } from '@app/pages/products/shared/models/product.model';

export interface ShoppingBasketProduct extends Product {
  requestedQantity: number;
  shipmmentDate: string;
}
