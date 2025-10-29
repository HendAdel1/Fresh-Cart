import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { debounce, debounceTime, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {

  constructor(){}

  
}
