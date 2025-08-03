import { Component, inject, OnInit } from '@angular/core';
import { BrandAndCatApi } from '../../core/services/brandAndCatApi/brand-and-cat-api';
import { IBrand } from '../../core/interfaces/brand/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.html',
  styleUrl: './brands.css',
})
export class Brands implements OnInit {
  private readonly brandAndCatApi = inject(BrandAndCatApi);

  brands!: IBrand[];
  pagesNum: number = 0;
  currentPage: number = 1;

  ngOnInit(): void {
    this.brandAndCatApi.getBrands(`?page=${this.currentPage}`).subscribe({
      next: (res) => {
        this.brands = res.data;
        this.pagesNum = res.metadata.numberOfPages;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goNextPage() {
    if (this.pagesNum > this.currentPage) {
      this.currentPage += 1;
      this.brandAndCatApi.getBrands(`?page=${this.currentPage}`).subscribe({
        next: (res) => {
          this.brands = res.data;
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
      this.brandAndCatApi.getBrands(`?page=${this.currentPage}`).subscribe({
        next: (res) => {
          this.brands = res.data;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
