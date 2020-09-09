import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {

  slideIndex = 0;
  constructor() { }

  ngOnInit(): void {
  }

  currentDiv(n) {
    this.showDivs(this.slideIndex = n);
  }

  showDivs(n) {
    let i;
    let x = document.getElementsByClassName("mySlides")as HTMLCollectionOf<HTMLElement>;
    if (n > x.length) { this.slideIndex = 1 }
    if (n < 1) {this.slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[this.slideIndex-1].style.display = "block";
  }

}
