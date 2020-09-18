import { Component, DEFAULT_CURRENCY_CODE, Input, OnInit } from '@angular/core';
import { ShoppingBasketSummary } from '../../models/shopping-basket-summary.model';

@Component({
  selector: 'app-shopping-basket-summary',
  templateUrl: './shopping-basket-summary.component.html',
  styleUrls: ['./shopping-basket-summary.component.scss'],
  providers: [{ provide: DEFAULT_CURRENCY_CODE, useValue: 'TRY' }],
})
export class ShoppingBasketSummaryComponent implements OnInit {
  @Input() shoppingBasketSummary: ShoppingBasketSummary;

  constructor() {}

  ngOnInit(): void {}
}
