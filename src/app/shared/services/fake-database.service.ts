import { Injectable } from '@angular/core';
import * as faker from 'faker/locale/tr';
import { Product } from 'src/app/pages/products/shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class FakeDatabaseService {
  database: {
    products: Product[];
    addedToBasketProducts: {
      id: string;
      quatity: number;
    }[];
  };

  constructor() {
    this.database = {
      products: [],
      addedToBasketProducts: [],
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
        imageUrl:
          'https://migros-dali-storage-prod.global.ssl.fastly.net/sanalmarket/product/05046981/05046981-7b197a.jpg',
        // imageUrl: faker.image.imageUrl(null, null, 'food', true, true),
        price: faker.commerce.price(1, 300, 2) as any,
        quantity: faker.random.number(100),
      });
    }

    return products;
  }
}
