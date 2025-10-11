import { ProductService } from './../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Product } from '../../core/models/data.interface';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductCardComponent, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  isLoading = false;
  skeletons = Array(10);
  products: Product[] = [];

  constructor(private productService: ProductService) {}

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
        },
      });
    }, 1500);
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false,
  }
}
