import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ICoupon } from '../../shared/interfaces/coupon.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  orders: Array<IProduct> = [];
  adminCoupon: Array<ICoupon> = [];
  totalPrice=0;
  checkedCoupon = false;
  saleCoupon='';
  useCoupon = undefined;
  orderID: number = 1;

  userName: string;
  userLastName: string;
  userPhone: string;
  userEmail: string;

  constructor(private orderService: OrderService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.adminFirebaseCoupons();
    this.getBasket();
    this.getTotal()
  }

  private adminFirebaseCoupons(): void {
    this.orderService.getFirecloudCoupon().subscribe(
      collection => {
        this.adminCoupon = collection.map(category => {
          const data = category.payload.doc.data() as ICoupon;
          const id = category.payload.doc.id;
          return { id, ...data };
        })
      }
    )
  }


  private getBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      this.orders = JSON.parse(localStorage.getItem('myOrder'));
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
    this.getTotal();
    this.updateBasket();
    this.orderService.basket.next('check');
  }

  getTotal(coupon?){
    if (coupon) {
      this.totalPrice = this.orders.reduce((total, elem) => {
        return (total + (elem.mainPrice * elem.count)) * (100-coupon)/100
      }, 0)
    }
      else {
        this.totalPrice = this.orders.reduce((total, elem) => {
          return total + (elem.mainPrice * elem.count)
        }, 0)
    }
  }

  checkCoupon(): void{
    if (this.saleCoupon != '') {
      this.useCoupon = this.adminCoupon.filter(coupon => coupon.code == this.saleCoupon)[0].percent;
      if (this.useCoupon != undefined) {
        this.getTotal(this.useCoupon)
        this.checkedCoupon = true
      }
    }
  }

  updateBasket(): void {
    localStorage.setItem('myOrder', JSON.stringify(this.orders))
  }

  deleteProductBasket(product: IProduct): void {
    if (confirm('Are you sure')) {
      const index = this.orders.findIndex(prod => prod.id == product.id);
      this.orders.splice(index, 1);
      this.updateBasket();
      this.getTotal();
      this.orderService.basket.next('check');
    }
  }

  addOrder(form: NgForm): void{
    const order = new Order(
      this.orderID,
      form.controls.userName.value,
      form.controls.userLastName.value,
      form.controls.userPhone.value,
      form.controls.userEmail.value,
      this.orders,
      this.totalPrice,
      new Date().toString()
    );
    delete order.id;
    this.orderService.addFirecloudOrder(Object.assign({}, order))
    .then(()=>{
    this.resetBasket();
    })
    
  }

  private resetBasket(): void {
    localStorage.removeItem('myOrder');
    this.orders = [];
    this.orderService.basket.next('check');
  }
}
