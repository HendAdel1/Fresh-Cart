import { environment } from './../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

type DecodedUser = { id: string, name: string, role: string};
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

  userDataDecoded = new BehaviorSubject<DecodedUser | null>(null);

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any, private router: Router) {

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      if (token) {
        this.decodedToken(token)
      }
    }
  }


  register(data: UserData): Observable<any> {
    return this.http.post(`${environment.baseUrl}auth/signup`, data)
  }

  login(data: UserDataLogin): Observable<any> {
    return this.http.post(`${environment.baseUrl}auth/signin`, data)
  }

  decodedToken(token: string) {
    const decoded = jwtDecode<DecodedUser>(token);
    this.userDataDecoded.next(decoded);
      return decoded;
  }

  logOut(){
    localStorage.removeItem('token');
    this.userDataDecoded.next(null);
    this.router.navigate(['/login']);
  }
}
