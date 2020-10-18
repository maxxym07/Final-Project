import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ICoupon } from '../../shared/interfaces/coupon.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Order } from '../../shared/models/order.model';
import { User } from '../../shared/models/user.model';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { IUser } from '../../shared/interfaces/user.interface';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  orders: Array<IProduct> = [];
  adminCoupon: Array<ICoupon> = [];
  totalPrice = 0;
  saleCoupon='';
  useCoupon = undefined;
  orderID: number = 1;

  userName: string;
  userLastName: string;
  userPhone: string;
  userEmail: string;
  myUser: any;

  allIsGood: boolean;

  checkName = /[A-Za-z]{2,20}/;
  checkSName = /[A-Za-z]{2,20}/;
  checkEmail = /^[\w\.\-]{1,}@\w{1,}\.\w{2,7}$/;
  checkPhone = /^\d{10}$/;
  
  constructor(private orderService: OrderService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.adminFirebaseCoupons();
    this.getBasket();
    this.getTotal();
    this.getUserData();
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
      this.useCoupon = this.adminCoupon.filter(coupon => coupon.code == this.saleCoupon.toLowerCase())[0].percent;
      if (this.useCoupon != undefined) {
        this.getTotal(this.useCoupon)
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

  addOrder(): void{
    const order = new Order(
      this.orderID,
      this.userName,
      this.userLastName,
      this.userPhone,
      this.userEmail,
      this.orders,
      this.totalPrice,
      new Date().toString()
    );
    delete order.id;
    this.orderService.addFirecloudOrder(Object.assign({}, order))
    .then(()=>{
      this.updateUser(this.myUser, order);
      this.resetBasket();
      this.updateBasket();
      this.orderService.basket.next('check');
      this.allIsGood = true;
    })
    
  }

  checkInputsBeforeOrder() {
    if (this.checkName.test(this.userName)) {
      if (this.checkSName.test(this.userLastName)){
        if (this.checkPhone.test(this.userPhone)) {
          if (this.checkEmail.test(this.userEmail)) {
            this.addOrder()
          }
          else {
            alert('Заповніть коректно поле "Електронна пошта"')
          }
        }
        else {
          alert('Заповніть коректно поле "Номер телефону"')
        }
      }
      else {
        alert('Заповніть коректно поле "Прізвище"')
      }
    }
    else {
      alert('Заповніть коректно поле "Імя"')
    }
  }
  

  getUserData(): void {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.firestore.collection('users').ref.where('idAuth', '==', user.idAuth).onSnapshot(
        collection => {
          collection.forEach(document => {
            const data = document.data() as IUser;
            const id = document.id;
            this.myUser = ({ id, ...data })

          })
          this.userName= this.myUser.firstName;
          this.userLastName= this.myUser.secondName;
          this.userEmail = this.myUser.email;
          this.userPhone = this.myUser.phone;
        }
      )
    }
  }

  updateUser(user: any, order: IOrder) {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      user.orders.push(Object.assign({}, order));
      const userUpd = new User(
        user.idAuth,
        user.firstName,
        user.secondName,
        user.orders,
        user.role,
        user.email,
        user.phone
      )
      localStorage.setItem('user', JSON.stringify(userUpd))
      this.firestore.collection('users').doc(user.id).update(Object.assign({}, userUpd));
    }
  }

  private resetBasket(): void {
    localStorage.removeItem('myOrder');
    this.orders = [];
    this.orderService.basket.next('check');
  }
}
