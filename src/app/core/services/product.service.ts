import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, Product } from '../models/data.interface';

interface PaginationParameter {
  limit?: number,
  page?: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts({ limit = 20, page = 1 }: PaginationParameter): Observable<Response> {
    return this.http.get<Response>(`https://ecommerce.routemisr.com/api/v1/products?limit=${limit}&page=${page}`);
  }

  getSpecificProduct(id: string): Observable<{data: Product}>{
    return this.http.get<{data: Product}>(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
}
