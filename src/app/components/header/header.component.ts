import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { OrderService } from '../../shared/services/order.service';
import { IProduct } from '../../shared/interfaces/product.interface';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   basket: Array<IProduct> = [];
  navbar:boolean;
  totalPrice = 0;
  burgerCount=0
  urlName: string;
  menuName: string;
  toProfileMobile: boolean;
  
  constructor(private ordService: OrderService,
    private authService: AuthService,) { }
  
  ngOnInit(): void {
    this.scrollHeader();
    this.checkBasket();
    this.getLocalStorage();
    this.checkUser();
    this.updateCheckUser();
  }
  
   checkBasket(): void {
    this.ordService.basket.subscribe(
      () => {
        this.getLocalStorage();
      }
    );
  }

   getLocalStorage(): void {
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


  closeBurger(): void{
    let menuSpan = <HTMLInputElement>document.getElementById('menu__toggle');
    menuSpan.checked=false
  }

  private updateCheckUser(): void{
    this.authService.userStatus.subscribe(
      () => {
        this.checkUser();
      }
    )
  }

  private checkUser():void{
    const user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      if (user.role === 'admin') {
        this.urlName = 'admin';
        this.menuName = 'Адмін'
      }
      else if (user.role === 'user') {
        this.urlName = 'profile';
        this.menuName = 'Кабінет'
        this.toProfileMobile = true;
      }
    }
    else {
      this.urlName = 'login';
      this.menuName = 'Увійти'
      this.toProfileMobile=false
    }
  }
}
