import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  constructor(private http: HttpClient) { }

  addProductToCart(productId: string): Observable<any>{
    return this.http.post(`${environment.baseUrl}/cart`,{productId},{
      headers: {
        token: localStorage?.getItem('token') || '',
      }
    })
  }

  updateProductQuantity(productId: string, count: string): Observable<any>{
    return this.http.put(`${environment.baseUrl}/cart/${productId}`, {count},{
      headers: {
        token: localStorage?.getItem('token') || '',
      }
    })
  }

  deleteProduct(productId: string): Observable<any>{
    return this.http.delete(`${environment.baseUrl}/cart/${productId}`,{
      headers: {
        token: localStorage?.getItem('token') || '',
      }
    })
  }

   clearCart(): Observable<any>{
    return this.http.delete(`${environment.baseUrl}/cart`,{
      headers: {
        token: localStorage?.getItem('token') || '',
      }
    })
  }
}
