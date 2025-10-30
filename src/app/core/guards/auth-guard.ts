import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = cookieService.get('token'); // ✅ get token from cookies

    if (token && token.trim() !== '') {
      if (!authService.userDataDecoded.value) {
        authService.decodedToken(token);
      }
      return true;
    }
  }

  return router.parseUrl('/login');
};
