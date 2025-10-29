import { ToastrService } from 'ngx-toastr';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CartService } from '../../core/services/cart.service';
import { CartResponse, ProductCart } from '../../core/models/data.interface';
import { CurrencyPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, ReactiveFormsModule, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  isLoading = false;
  cartData: CartResponse | null = null;
  updateLoading = false;
  currentIndex: number = -1;
  isAddressFormOpen = false;

  addressForm = new FormGroup({
    details: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  })
  private cartService = inject(CartService);
  private toastr = inject(ToastrService)

  ngOnInit(): void {
      this.getUserCart()
  }

  getUserCart(){
    this.isLoading = true;
    this.cartService.getUserCart().subscribe({
      next: (res) =>{
        this.isLoading = false;
        this.cartData = res;
      },
      error: (error) => {
        this.isLoading = false;
      }
    })
  }

 updateQuantity(item: ProductCart, change: number, currentIndex: number): void {
  this.currentIndex = currentIndex;
  this.updateLoading = true;
    const newCount = item.count + change;
    if (newCount < 1) return;

    this.cartService.updateProductQuantity(item.product._id, newCount.toString()).subscribe({
      next: (res) => {
        this.updateLoading = false;
        this.cartData = res;
      },
      error: (err) => {
        this.updateLoading = false;
      }
    });
  }

  deleteProduct(id: string){
    this.cartService.deleteProduct(id).subscribe({
        next: (res) => {
        this.cartData = res;
      },
      error: (err) => {
        this.toastr.error(err.message);
      }
    })
  }

  clearCart(){
    this.cartService.clearCart().subscribe({
      next: (res) => {
        this.cartData = null;
      },
      error: (err) => {
        this.toastr.error(err.message);
      }
    })
  }

  checkoutSession(){
    if(!this.cartData?.cartId) return; 
    if(this.addressForm.invalid){
      this.addressForm.markAllAsTouched();
       return; 
    }
    this.cartService.checkoutSession(this.cartData?.cartId, {
        details: this.addressForm.value.details!,
          phone: this.addressForm.value.phone!,
          city: this.addressForm.value.city!,
    }).subscribe({
        next: (res) => {
        this.cartData = null;
        window.location.href = res.session.url;
      },
      error: (err) => {
        this.toastr.error(err.message);
      }
    })
    
  }

}
