import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, Product } from '../models/data.interface';
import { environment } from '../../../environments/environment.development';

interface PaginationParameter {
  limit?: number,
  page?: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts({ limit = 20, page = 1 }: PaginationParameter): Observable<Response<Product>> {
    return this.http.get<Response<Product>>(`${environment.baseUrl}/products?limit=${limit}&page=${page}`);
  }

  getSpecificProduct(id: string): Observable<{data: Product}>{
    return this.http.get<{data: Product}>(`${environment.baseUrl}/products/${id}`);
  }
}
