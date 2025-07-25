import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../core/interfaces/product/product';
import { Getdata } from '../../core/services/getdata/getdata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private readonly getApiData = inject(Getdata);
  private readonly router = inject(Router);

  products!: Product[];
  pagesNum: number = 0;
  currentPage: number = 1;

  ngOnInit() {
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
  addToCart(e: Event) {
    e.stopPropagation();
    console.log('add to cart');
  }

  addToWishList(e: Event) {
    e.stopPropagation();
    console.log('add ti wishlist');
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
