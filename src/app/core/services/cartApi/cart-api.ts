import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { UserData } from '../userData/user-data';

@Injectable({
  providedIn: 'root',
})
export class CartApi {
  constructor(private httpClient: HttpClient, private userData: UserData) {}

  addToCart(prodId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`, {
      productId: prodId,
    });
  }

  getUserCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  updateQuantity(id: string, count: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, {
      count: count,
    });
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }
}
