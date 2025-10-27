import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-all-orders',
  imports: [CurrencyPipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit {
  orders: any[] = [];
  isLoading = true;
  userId: string | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.userDataDecoded.subscribe((user) => {
      if (user?.id) {
        this.userId = user.id;
        this.getOrders(user.id);
      } else {
        this.isLoading = false;
      }
    });
  }

  getOrders(userId: string) {
    this.isLoading = true;
    this.cartService.allUserOrders(userId).subscribe({
      next: (res: any) => {
        this.orders = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }

}