import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { FakeApiService } from 'src/app/shared/services/fake-api.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private fakeApiService: FakeApiService) {}

  getProductList(): Observable<Product[]> {
    return this.fakeApiService.getProductList();
  }
}
