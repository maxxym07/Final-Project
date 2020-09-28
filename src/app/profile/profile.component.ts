import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/interfaces/product.interface';
import { ProductService } from '../shared/services/product.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../shared/services/auth.service';
import { IUser } from '../shared/interfaces/user.interface';
import { User } from '../shared/models/user.model';

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
  userId: any;
  userRole:string;
  findUserID: any;
  checkOrderStatus: Array<IProduct> = [];

  constructor(private authService:AuthService,
    private firestore: AngularFirestore,) { }

  ngOnInit(): void {
    this.getUserData()
  }


  private getUserData(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    this.userEmail = user.email;
    this.userName = user.firstName;
    this.userLastName = user.secondName;
    this.userPhone = user.phone;
    this.userId=user.idAuth
    this.userRole=user.role
    this.userOrder = user.orders;
  }

  signOut(): void{
    this.authService.signOut();
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

 viewDetailsOrder() {
  // this.viewDetails=!this.viewDetails
}
}
