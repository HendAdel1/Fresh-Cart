import { Component, Input } from '@angular/core';
import { Product } from '../../../core/models/data.interface';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product: Product = {} as Product;

  constructor( private cartService: CartService,
    private toastr: ToastrService
  ){}


  addProductToCart(productId: string){
    this.cartService.addProductToCart(productId).subscribe({
     next: (res) => {
        this.toastr.success(res.message);
      },
      error: (err) => {
        this.toastr.error(err.message);
      }
    })
  }
}
