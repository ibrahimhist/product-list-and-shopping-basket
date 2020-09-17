import {
  trigger,
  transition,
  query,
  stagger,
  animateChild,
  style,
  animate,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [
    // nice stagger effect when showing existing elements
    trigger('list', [
      transition(':enter', [
        // child animation selector + stagger
        query('@items', stagger(90, animateChild())),
      ]),
    ]),
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate(
          '1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({ transform: 'scale(1)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate(
          '1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
            height: '0px',
            margin: '0px',
          })
        ),
      ]),
    ]),
  ],
})
export class ProductListComponent implements OnInit {
  @Input() productList: Product[];
  @Input() callbackFunForAddingBasket?: (product: Product) => void;

  constructor() {}

  ngOnInit(): void {}
}
