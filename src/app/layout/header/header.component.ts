import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  hidden = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onClickCompanyName(): void {
    this.router.navigate(['/']);
  }

  onClickMyShoppingBasket(): void {
    this.router.navigate(['/shopping-basket/my-shopping-basket']);
  }
}
