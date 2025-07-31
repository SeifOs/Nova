import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class Getdata {
  constructor(private httpClient: HttpClient) {}

  getAllCat(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }

  getAllProducts(page: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products${page}`);
  }

  getSpecificProduct(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`);
  }
}
