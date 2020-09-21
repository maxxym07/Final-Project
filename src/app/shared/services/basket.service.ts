import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basket: Array<IProduct>
  totalPrice: any;

  constructor() { }

  setTotal(coupon?){
    if (coupon) {
      this.totalPrice = this.basket.reduce((total, elem) => {
        return (total + (elem.mainPrice * elem.count)) * (100-coupon)/100
      }, 0)
    }
      else {
        this.totalPrice = this.basket.reduce((total, elem) => {
          return total + (elem.mainPrice * elem.count)
        }, 0)
      }
    return this.totalPrice
    
  }

  setBasket(): any {
    if (localStorage.length > 0 && localStorage.getItem("myOrder")) {
      this.basket = JSON.parse(localStorage.getItem("myOrder"));
      return this.basket
    }
  }
  
  productCount(product: IProduct, status: boolean): void {
    if (status) {
      product.count++;
    }
    else {
      if (product.count > 1) {
        product.count--;
      }
    }
    this.setTotal();
    this.updateBasket();
  }

  
  updateBasket(): void {
    localStorage.setItem('myOrder', JSON.stringify(this.basket))
  }

  deleteProductBasketS(product:IProduct): void{
    const index = this.basket.findIndex(prod => prod.id == product.id);
    this.basket.splice(index, 1);
    this.setTotal();
    this.updateBasket();
  }

  removeBasket(): void{
    this.basket = [];
  }

  getBasket(){
    return this.basket
  }
  getTotal(){
    return this.totalPrice
  }
}
