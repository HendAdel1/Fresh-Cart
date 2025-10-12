import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Response } from '../models/data.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private http: HttpClient) { }

    getCategories( page: number = 1 ): Observable<Response<Category>> {
      return this.http.get<Response<Category>>(`https://ecommerce.routemisr.com/api/v1/categories?limit=$page=${page}`);
    }

      getSpecificCategory(id: string): Observable<{data: Category}>{
        return this.http.get<{data: Category}>(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
      }
  
}
