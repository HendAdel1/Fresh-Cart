import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface PaginationParameter {
  limit?: number,
  page?: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts({ limit = 20, page = 1 }: PaginationParameter): Observable<any> {
    return this.http.get(`http://ecommerce.routemisr.com/api/v1/products?limit=${limit}&page=${page}`);
  }
}
