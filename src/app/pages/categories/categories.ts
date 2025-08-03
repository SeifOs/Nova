import { Component, inject, OnInit } from '@angular/core';
import { BrandAndCatApi } from '../../core/services/brandAndCatApi/brand-and-cat-api';
import { ICategory } from '../../core/interfaces/category/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  private readonly brandAndCatApi = inject(BrandAndCatApi);

  cats!: ICategory[];

  ngOnInit(): void {
    this.brandAndCatApi.getCat().subscribe({
      next: (res) => {
        this.cats = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
