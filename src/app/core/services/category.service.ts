import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Response } from '../models/data.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private http: HttpClient) { }

    getCategories( page: number = 1 ): Observable<Response<Category>> {
      return this.http.get<Response<Category>>(`${environment.baseUrl}/categories?limit=$page=${page}`);
    }

      getSpecificCategory(id: string): Observable<{data: Category}>{
        return this.http.get<{data: Category}>(`${environment.baseUrl}/categories/${id}`);
      }
  
}
