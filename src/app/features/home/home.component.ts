import { CategoryService } from './../../core/services/category.service';
import { ProductService } from './../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Category, Product } from '../../core/models/data.interface';
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
  categories: Category[] = [];
  constructor(private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCatgories();
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

  getAllCatgories(){
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
        console.log(response.data);
        
      }
    })
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
        items: 7
      }
    },
    nav: false,
  }
}
