import { Router } from '@angular/router';
import { Product } from '../../core/interfaces/product/product';
import { WishListApi } from './../../core/services/wishListApi/wish-list-api';
import { Component, inject, OnInit } from '@angular/core';
import { Notifications } from '../../core/services/notifications/notifications';
import { CartApi } from '../../core/services/cartApi/cart-api';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.css',
})
export class WishList implements OnInit {
  private readonly wishListApi = inject(WishListApi);
  private readonly router = inject(Router);
  private readonly notifications = inject(Notifications);
  private readonly cartApi = inject(CartApi);

  products!: Product[];

  ngOnInit(): void {
    this.getUserWishList();
  }

  getUserWishList() {
    this.wishListApi.getWishList().subscribe({
      next: (res) => {
        this.products = res.data;
        console.log(this.products);
      },
    });
  }

  goToProduct(Id: string) {
    this.router.navigate(['/product', Id, 1]);
  }

  deleteProduct(e: Event, id: string) {
    e.stopPropagation();

    this.wishListApi.removeFromWishList(id).subscribe({
      next: (res) => {
        this.getUserWishList();
        this.notifications.showSuccess(res.message, res.status);
      },
      error: (err) => {
        this.notifications.showError(err.error.message, err.error.statusMsg);
      },
    });
  }

  addToCart(e: Event, id: string) {
    e.stopPropagation();

    this.cartApi.addToCart(id).subscribe({
      next: (res) => {
        this.notifications.showSuccess(res.message, res.status);
      },
      error: (err) => {
        this.notifications.showError(err.error.message, err.error.statusMsg);
      },
    });
  }
}
