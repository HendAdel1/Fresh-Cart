import { ProductService } from './../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { Product } from '../../core/models/data.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  isLoading = false;
  skeletons = Array(10);
  products: Product[] = [];

  constructor( private productService: ProductService){}

  ngOnInit(): void {
      this.getAllProducts();
  }

 getAllProducts() {
  this.isLoading = true;
  // simulate slow API
  setTimeout(() => {
    this.productService.getAllProducts({}).subscribe({
      next: (response) => {
        this.products = response.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }, 1500);
}

}
