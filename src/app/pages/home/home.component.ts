import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myIndex = 0;

  constructor() { }

  ngOnInit(): void {
    this.carousel();
  }

  carousel() {
    let i;
    let x = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < x.length; i++) {
      x[i].style.display = 'none';  
    }
    this.myIndex++;
    if (this.myIndex > x.length) {
      this.myIndex = 1
    }    
    x[this.myIndex - 1].style.display = 'block'; 
    setTimeout(()=>{this.carousel()},4000);
  }

}
