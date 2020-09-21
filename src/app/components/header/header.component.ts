import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navbar:boolean;
  totalPrice = 0;
  
  constructor() { }
  
  ngOnInit(): void {
    this.scrollHeader();
  }
  
  scrollHeader() {
    let mainMenu = document.getElementsByClassName('menu-header') as HTMLCollectionOf<HTMLElement>;

    fromEvent(window, 'scroll').subscribe(() => {
      if (window.scrollY > 100) {
        this.navbar = true;
        
        mainMenu[0].style.top = '0px'
        mainMenu[0].style.position = 'fixed'
      }
      else {
        this.navbar = false;
        mainMenu[0].style.position = 'relative'
      }
    })
  }

  
}
