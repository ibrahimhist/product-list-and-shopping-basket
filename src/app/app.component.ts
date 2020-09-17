import { Component } from '@angular/core';
import { FakeApiService } from './shared/services/fake-api.service';
import { FakeDatabaseService } from './shared/services/fake-database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'product-list-and-shopping-basket';
  constructor(private fakeDatabaseService: FakeDatabaseService) {
    this.fakeDatabaseService.initiateDatabase();
  }
}
