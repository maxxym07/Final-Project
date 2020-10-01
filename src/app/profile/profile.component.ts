import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/interfaces/product.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../shared/services/auth.service';
import { IUser } from '../shared/interfaces/user.interface';
import { User } from '../shared/models/user.model';
import { IOrder } from '../shared/interfaces/order.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userOrderArray: Array<IOrder> = [];
  orderStatus: Array<IProduct> = [];
  userEmail:string;
  userName:string;
  userLastName:string;
  userPhone: string;
  userOrder: any;
  userID: any;
  userRole:string;
  finduser: any;

  constructor(private authService:AuthService,
    private firestore: AngularFirestore,) { }

  ngOnInit(): void {
    this.getUser();
    this.updateOrderStatus()
  }


  private getUser(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    this.userID=user.idAuth
    this.userEmail = user.email;
    this.userName = user.firstName;
    this.userLastName = user.secondName;
    this.userPhone = user.phone;
    this.userRole=user.role
    this.userOrder = user.orders;
  }

    
  updateOrderStatus(): void {
    for (let i = 0; i < this.userOrder.length; i++) {
      this.firestore.collection('orders').ref.where('dateOrder', '==', this.userOrder[i].dateOrder).onSnapshot(
        collection => {
          collection.forEach(document => {
            const data = document.data() as IProduct;
            const id = document.id;
            this.orderStatus.push({ id, ...data })
          });
        })
    }
    this.userOrder = this.orderStatus;
  }


  async updateUser() {
    localStorage.removeItem('user');
    let user: IUser;
    user = new User(
      this.userID,
      this.userName,
      this.userLastName,
      this.userOrder,
      this.userRole,
      this.userEmail,
      this.userPhone);
    localStorage.setItem('user', JSON.stringify(user));
    this.firestore.collection('users').ref.where('idAuth', '==',  this.userID).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data=document.data() as IUser;
          const id = document.id;
          this.finduser=({ id, ...data })
        })
      },
       )
      if (await this.finduser) {
   this.firestore.collection('users').doc(this.finduser.id).update(Object.assign({}, user));              
       }
 }

 signOut(): void{
  this.authService.signOut();
}

  
}
