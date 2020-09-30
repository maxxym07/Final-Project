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
  viewDetails: boolean;
  userEmail:string;
  userName:string;
  userLastName:string;
  userPhone: string;
  userOrder: any;
  userOrderArray: Array<IOrder> = [];
  userId: any;
  userRole:string;
  findUserID: any;
  orderStatus: Array<IProduct> = [];

  constructor(private authService:AuthService,
    private firestore: AngularFirestore,) { }

  ngOnInit(): void {
    this.getUserData();
    this.updateOrderStatus()
  }


  private getUserData(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    this.userId=user.idAuth
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
      this.userId,
       this.userName,
       this.userLastName,
     this.userOrder,
      this.userRole,
       this.userEmail,
       this.userPhone);
    localStorage.setItem('user', JSON.stringify(user));
    this.firestore.collection('users').ref.where('idAuth', '==',  this.userId).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data=document.data() as IUser;
          const id = document.id;
          this.findUserID=({ id, ...data })
        })
      },
       )
      if (await this.findUserID) {
   this.firestore.collection('users').doc(this.findUserID.id).update(Object.assign({}, user));              
       }
 }

 signOut(): void{
  this.authService.signOut();
}

  
}
