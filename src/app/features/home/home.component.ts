import { Component } from '@angular/core';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-home',
  imports: [ ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
