import { UserData } from './../../core/services/userData/user-data';
import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../../core/services/flowbite/flowbite';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { Getdata } from '../../core/services/getdata/getdata';
import { Category } from '../../core/interfaces/category/category';
import { Product } from '../../core/interfaces/product/product';
import { CartApi } from '../../core/services/cartApi/cart-api';
import { Notifications } from '../../core/services/notifications/notifications';
import { WishListApi } from '../../core/services/wishListApi/wish-list-api';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CarouselModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  host: {
    ngSkipHydration: 'true',
  },
})
export class Home implements OnInit {
  private readonly flowbite = inject(Flowbite);
  private readonly getDataApi = inject(Getdata);
  private readonly router = inject(Router);
  private readonly userData = inject(UserData);
  private readonly cartApi = inject(CartApi);
  private readonly notifications = inject(Notifications);
  private readonly wishListApi = inject(WishListApi);

  categories!: Category[];
  products!: Product[];
  wishList!: Product[];
  wishListIds: string[] = [];
  responsiveOptions: any = [
    {
      breakpoint: '1199px',
      numVisible: 7,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  userName: string = 'User';

  ngOnInit(): void {
    this.userName = this.userData.getName();

    this.flowbite.loadFlowbite((flowbite) => {
      initFlowbite();
    });

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

    this.getDataApi.getAllCat().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.getDataApi.getAllProducts('/').subscribe({
      next: (res) => {
        if (res.data.length > 20) {
          this.products = res.data;
          this.products.length = 20;
        } else {
          this.products = res.data;
        }
      },
    });
  }

  goToProduct(Id: string) {
    this.router.navigate(['/product', Id]);
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
}
