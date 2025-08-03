// all-orders.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { IOrder } from '../../core/interfaces/IOrder/iorder';
import { OrdersApi } from '../../core/services/ordersApi/orders-api';
import { UserData } from '../../core/services/userData/user-data';

@Component({
  selector: 'app-all-orders',
  imports: [],
  templateUrl: './all-orders.html',
  styleUrl: './all-orders.css',
})
export class AllOrders implements OnInit {
  private readonly ordersApi = inject(OrdersApi);
  private readonly userData = inject(UserData);

  orders!: IOrder[];
  userId: string = '';

  ngOnInit(): void {
    this.userId = this.userData.getId();
    this.ordersApi.getAllOrders(this.userId).subscribe({
      next: (res) => {
        this.orders = res;
        console.log(this.orders);
      },
    });
  }
}
