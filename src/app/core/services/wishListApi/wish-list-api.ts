import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class WishListApi {
  constructor(private httpClient: HttpClient) {}

  addToWishList(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`, {
      productId: id,
    });
  }

  removeFromWishList(id: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/api/v1/wishlist/${id}`
    );
  }

  getWishList(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }
}
