import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/data.interface';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-product',
  imports: [ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  isLoading = false;
  skeletons = Array(10);
  products: Product[] = [];

  constructor(private productService: ProductService,
    ) {}
  
  ngOnInit(): void {
    this.getAllProducts();
  }



    getAllProducts() {
    this.isLoading = true;
    // simulate slow API
    setTimeout(() => {
      this.productService.getAllProductsPage({}).subscribe({
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
}
