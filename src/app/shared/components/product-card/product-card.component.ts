import { Component, Input } from '@angular/core';
import { Product } from '../../../core/models/data.interface';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product: Product = {} as Product;
}
