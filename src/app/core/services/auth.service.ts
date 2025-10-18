import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface UserDataLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    register(data: UserData): Observable<any>{
      return this.http.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)
    }

    login(data: UserDataLogin): Observable<any>{
      return this.http.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
    }
}
