import { CookieService } from 'ngx-cookie-service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  
  const cookies = inject(CookieService);
  const token = cookies.get('token');

  if(token){
    req = req.clone({
      setHeaders: {
        token: token
      }
    })
  }
  return next(req);
};
