import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/data.interface';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  
})
export class ProductDetailsComponent implements OnInit {

  product: Product | null = null;
  isLoading = false;
  selectedImage: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id")
      if (id) {
        this.getSpecificProduct(id);
      }
    })
  }
  
  getSpecificProduct(id: string) {
    this.isLoading = true;
    
    this.productService.getSpecificProduct(id).subscribe({
      next: (response) => {
        if (response.data) {
          this.product = response.data;
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.isLoading = false;
      }
    })
  }
  
  changeMainImage(image: string) {
    this.selectedImage = image;
  }
}
