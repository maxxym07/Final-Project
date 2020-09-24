import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { OrderService } from '../../shared/services/order.service';
import { IProduct } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private basket: Array<IProduct> = [];
  navbar:boolean;
  totalPrice = 0;
  
  constructor(private ordService: OrderService) { }
  
  ngOnInit(): void {
    this.scrollHeader();
    this.checkBasket();
    this.getLocalStorage();
  }
  


  private checkBasket(): void {
    this.ordService.basket.subscribe(
      () => {
        this.getLocalStorage();
      }
    );
  }

  private getLocalStorage(): void {
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      this.basket = JSON.parse(localStorage.getItem('myOrder'));
      this.totalPrice = this.basket.reduce((total, prod) => {
        return total + (prod.mainPrice * prod.count);
      }, 0);
    }
    else {
      this.totalPrice = 0;
    }
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
