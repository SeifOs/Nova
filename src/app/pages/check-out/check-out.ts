import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { OrdersApi } from '../../core/services/ordersApi/orders-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.html',
  styleUrl: './check-out.css',
})
export class CheckOut implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersApi = inject(OrdersApi);

  cartId: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        if (res.get('cartId') != null) {
          this.cartId = res.get('cartId')!;
        }
      },
    });
  }

  checkOutForm: FormGroup = new FormGroup({
    details: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, [Validators.required]),
  });

  submitForm() {
    if (this.checkOutForm.valid) {
      this.isLoading = true;

      this.ordersApi
        .createOrder(this.cartId, this.checkOutForm.value)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            console.log(res);
            if (res.status == 'success') {
              window.open(res.session.url, '_self');
            }
          },
          error: (err) => {
            this.isLoading = false;
            console.log(err);
          },
        });
    }
  }
}
