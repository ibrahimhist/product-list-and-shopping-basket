import { Injectable } from '@angular/core';

import { Product } from 'src/app/pages/products/shared/models/product.model';
import { FakeDatabaseService } from './fake-database.service';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

import * as faker from 'faker/locale/tr';

@Injectable({
  providedIn: 'root',
})
export class FakeApiService {
  constructor(private fakeDatabaseService: FakeDatabaseService) {}

  getProductList(): Observable<Product[]> {
    return of([...this.fakeDatabaseService.database.products])
      .pipe
      // delay(faker.random.number(3000))
      ();
  }
}
