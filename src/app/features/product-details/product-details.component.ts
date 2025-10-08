import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../../core/models/data.interface';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  
  constructor (private productService: ProductService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id")
      if(id){
        this.getSpecificProduct(id);
      }
    })
  }

  getSpecificProduct(id: string){
    this.productService.getSpecificProduct(id).subscribe({
      next:(response) =>{

      },
      error: (error) => {

      }
    })
  }

}
