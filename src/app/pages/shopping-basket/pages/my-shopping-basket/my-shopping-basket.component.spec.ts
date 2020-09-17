import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShoppingBasketComponent } from './my-shopping-basket.component';

describe('MyShoppingBasketComponent', () => {
  let component: MyShoppingBasketComponent;
  let fixture: ComponentFixture<MyShoppingBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyShoppingBasketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShoppingBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
