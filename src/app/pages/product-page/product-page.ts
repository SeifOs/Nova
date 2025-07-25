import { Product } from './../../core/interfaces/product/product';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Getdata } from '../../core/services/getdata/getdata';
import { ViewChild } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-product-page',
  imports: [CarouselModule],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly getApiData = inject(Getdata);

  @ViewChild('carousel') carousel!: Carousel;
  loading = true;

  product!: Product;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.getApiData.getSpecificProduct(res.get('id')!).subscribe({
          next: (res2) => {
            this.onProductDataLoaded(res2.data);

            console.log(res.get('id'));
            console.log(res2.data);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  pauseCarousel() {
    if (this.carousel) {
      this.carousel.stopAutoplay();
    }
  }
  resumeCarousel() {
    if (this.carousel) {
      this.carousel.startAutoplay();
    }
  }
  onImageError(event: any) {
    event.target.src = 'assets/placeholder-image.png'; // Replace with your placeholder
  }
  onProductDataLoaded(productData: any) {
    this.product = productData;
    this.loading = false;
  }
}
