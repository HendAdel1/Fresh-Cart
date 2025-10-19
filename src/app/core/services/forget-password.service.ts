import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor( private http: HttpClient){}

  forgetPassword(data: {email: string}): Observable<any> {
      return this.http.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data)
    }
  
    verifyCode(data:{resetCode: string}): Observable<any>{
      return this.http.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', data)
    }

    resetPassword(data:{email: string, newPassword: string}): Observable<any>{
      return this.http.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', data)
    }
}
