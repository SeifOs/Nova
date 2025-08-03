import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandAndCatApi {
  constructor(private httpClient: HttpClient) {}

  getBrands(page: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands${page}`);
  }

  getCat(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }
}
