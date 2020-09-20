import { Injectable } from '@angular/core';
import * as faker from 'faker/locale/tr';
import { Product } from 'src/app/pages/products/shared/models/product.model';

export interface AddedToBasketProduct {
  productId: string;
  requestedQuatity: number;
}

export interface CompletedShopping {
  id: string;
  products: AddedToBasketProduct[];
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class FakeDatabaseService {
  database: {
    products: Product[];
    addedToBasketProducts: AddedToBasketProduct[];
    completedShoppings: CompletedShopping[];
  };

  constructor() {
    this.database = {
      products: [],
      addedToBasketProducts: [],
      completedShoppings: [],
    };
  }

  initiateDatabase(): void {
    this.database.products = this.generateProducts();
  }

  private generateProducts(): Product[] {
    const productCount: number = faker.random.number(100) || 1;
    const products: Product[] = [];
    for (let i = 0; i < productCount; i++) {
      products.push({
        id: faker.random.uuid(),
        title: faker.commerce.productName(),
        imageUrl: 'assets/images/product-img.jpg',
        // imageUrl: faker.image.imageUrl(null, null, 'food', true, true),
        price: faker.commerce.price(1, 300, 2) as any,
        quantity: faker.random.number(10),
      });
    }

    return products;
  }
}
