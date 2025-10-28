import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-global-loading',
  imports: [],
  templateUrl: './global-loading.component.html',
  styleUrl: './global-loading.component.css'
})
export class GlobalLoadingComponent implements OnInit{

  isLoading = false;
  public loaderService = inject(LoaderService);

 
  ngOnInit(): void {
      this.loaderService.isLoading();
  }
}
