import { Router, RouterLink } from '@angular/router';
import { CartItem } from '../../core/interfaces/cartItem/cart-item';
import { CartApi } from './../../core/services/cartApi/cart-api';
import { Component, inject, OnInit } from '@angular/core';
import { Notifications } from '../../core/services/notifications/notifications';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  private readonly cartApi = inject(CartApi);
  private readonly router = inject(Router);
  private readonly notifications = inject(Notifications);

  cartId: string = '';
  numOfCartItems: number = 0;
  totalCartPrice: number = 0;
  products!: CartItem[];
  isEmpty: boolean = true;

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart(): void {
    this.cartApi.getUserCart().subscribe({
      next: (res) => {
        this.cartId = res.cartId;
        this.numOfCartItems = res.numOfCartItems;
        this.products = res.data.products;
        this.totalCartPrice = res.data.totalCartPrice;
        if (this.products.length == 0) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }
      },
    });
  }

  goToProduct(Id: string) {
    this.router.navigate(['/product', Id]);
  }

  deleteProduct(e: Event, id: string) {
    e.stopPropagation();

    this.cartApi.updateQuantity(id, 0).subscribe({
      next: (res) => {
        this.getUserCart();
        this.notifications.showSuccess(res.message, res.status);
      },
      error: (err) => {
        this.notifications.showError(err.error.message, err.error.statusMsg);
      },
    });
  }

  changeCount(e: Event, id: string, count: number) {
    e.stopPropagation();

    this.cartApi.updateQuantity(id, count).subscribe({
      next: (res) => {
        this.getUserCart();
      },
    });
  }

  clearCart() {
    this.cartApi.clearCart().subscribe({
      next: (res) => {
        this.getUserCart();
        this.notifications.showSuccess(res.message, res.status);
        this.isEmpty = true;
      },
      error: (err) => {
        this.notifications.showError(err.error.message, err.error.statusMsg);
      },
    });
  }
}
