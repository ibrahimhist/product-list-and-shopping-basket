import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingBasketItemComponent } from './shopping-basket-item.component';

describe('ShoppingBasketItemComponent', () => {
  let component: ShoppingBasketItemComponent;
  let fixture: ComponentFixture<ShoppingBasketItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingBasketItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingBasketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
