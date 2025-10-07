import { ProductService } from './../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-home',
  imports: [ ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products: any[] = [];
  constructor( private productService: ProductService){}

  ngOnInit(): void {
      this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts({}).subscribe({
      next: (response) => {
        console.log(response.data);
        this.products = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
