import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingBasketSummaryComponent } from './shopping-basket-summary.component';

describe('ShoppingBasketSummaryComponent', () => {
  let component: ShoppingBasketSummaryComponent;
  let fixture: ComponentFixture<ShoppingBasketSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingBasketSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingBasketSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
