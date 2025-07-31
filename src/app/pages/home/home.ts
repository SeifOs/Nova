import { UserData } from './../../core/services/userData/user-data';
import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../../core/services/flowbite/flowbite';
import { Router, RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { Getdata } from '../../core/services/getdata/getdata';
import { Category } from '../../core/interfaces/category/category';
import { Product } from '../../core/interfaces/product/product';
import { ToastrService } from 'ngx-toastr';
import { CartApi } from '../../core/services/cartApi/cart-api';

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
  private readonly toastrService = inject(ToastrService);
  private readonly userData = inject(UserData);
  private readonly cartApi = inject(CartApi);

  categories!: Category[];
  products!: Product[];
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
        console.log('added to the cart');
      },
    });
  }

  // Token needed !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  addToWishList(e: Event, id: string) {
    e.stopPropagation();
  }

  showSuccess(title: string, body: string) {
    this.toastrService.success(body, title);
  }
}
