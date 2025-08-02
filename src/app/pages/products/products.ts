import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../core/interfaces/product/product';
import { Getdata } from '../../core/services/getdata/getdata';
import { Router } from '@angular/router';
import { CartApi } from '../../core/services/cartApi/cart-api';
import { Notifications } from '../../core/services/notifications/notifications';
import { WishListApi } from '../../core/services/wishListApi/wish-list-api';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private readonly getApiData = inject(Getdata);
  private readonly router = inject(Router);
  private readonly cartApi = inject(CartApi);
  private readonly notifications = inject(Notifications);
  private readonly wishListApi = inject(WishListApi);

  products!: Product[];
  pagesNum: number = 0;
  currentPage: number = 1;
  wishList!: Product[];
  wishListIds: string[] = [];

  ngOnInit() {
    this.wishListApi.getWishList().subscribe({
      next: (res) => {
        this.wishList = res.data;
        for (let i = 0; i < this.wishList.length; i++) {
          this.wishListIds.push(this.wishList[i]._id);
        }
        console.log(this.wishListIds);
      },
      error: (err) => {
        this.notifications.showError(err.error.message, err.error.statusMsg);
      },
    });

    this.getApiData.getAllProducts(`?page=${this.currentPage}`).subscribe({
      next: (res) => {
        this.products = res.data;
        this.pagesNum = res.metadata.numberOfPages;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goToProduct(id: string) {
    this.router.navigate(['/product', id]);
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

  toggleWishList(e: Event, id: string) {
    e.stopPropagation();

    if (this.wishListIds.includes(id)) {
      this.wishListApi.removeFromWishList(id).subscribe({
        next: (res) => {
          this.notifications.showSuccess(res.message, res.status);
          this.wishListIds.splice(this.wishListIds.indexOf(id), 1);
        },
        error: (err) => {
          this.notifications.showError(err.error.message, err.error.statusMsg);
        },
      });
    } else {
      this.wishListApi.addToWishList(id).subscribe({
        next: (res) => {
          this.notifications.showSuccess(res.message, res.status);
          this.wishListIds.push(id);
        },
        error: (err) => {
          this.notifications.showError(err.error.message, err.error.statusMsg);
        },
      });
    }
  }

  goNextPage() {
    if (this.pagesNum > this.currentPage) {
      this.currentPage += 1;
      this.getApiData.getAllProducts(`?page=${this.currentPage}`).subscribe({
        next: (res) => {
          this.products = res.data;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  goPrevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.getApiData.getAllProducts(`?page=${this.currentPage}`).subscribe({
        next: (res) => {
          this.products = res.data;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
