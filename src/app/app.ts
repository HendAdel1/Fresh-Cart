import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { AuthService } from './core/services/auth.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { GlobalLoadingComponent } from "./shared/components/global-loading/global-loading.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, GlobalLoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);

  // SSR-safe state signal
  isBrowser = false;

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) {
      this.isBrowser = true;
      const token = localStorage.getItem('token');
      if (token) {
        this.authService.decodedToken(token);
      }
    }
  }
}
