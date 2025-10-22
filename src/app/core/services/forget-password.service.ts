import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor( private http: HttpClient){}

  forgetPassword(data: {email: string}): Observable<any> {
      return this.http.post(`${environment.baseUrl}/auth/forgotPasswords`, data)
    }
  
    verifyCode(data:{resetCode: string}): Observable<any>{
      return this.http.post(`${environment.baseUrl}/auth/verifyResetCode`, data)
    }

    resetPassword(data:{email: string, newPassword: string}): Observable<any>{
      return this.http.put(`${environment.baseUrl}/auth/resetPassword`, data)
    }
}
