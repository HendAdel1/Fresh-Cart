import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent  implements OnInit, OnDestroy {
  categories = [
    {
      _id: '1',
      name: 'Fresh Food',
      image: 'images/slider-2.jpg',
    },
    {
      _id: '2',
      name: 'Fast Food',
      image: 'images/slider-3.jpg',
    },
  ];

  currentSlide = 0;
  intervalId: any;
  autoSlideInterval = 4000; 

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.categories.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.categories.length) % this.categories.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => this.nextSlide(), this.autoSlideInterval);
  }

  stopAutoSlide() {
    clearInterval(this.intervalId);
  }
}