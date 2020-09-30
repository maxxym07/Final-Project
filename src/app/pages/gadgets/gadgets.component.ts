import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-gadgets',
  templateUrl: './gadgets.component.html',
  styleUrls: ['./gadgets.component.scss']
})
export class GadgetsComponent implements OnInit {

  userGadgets: Array<IProduct> = [];
  p: number = 1;

  constructor(private afStorage: AngularFirestore,) { }

  ngOnInit(): void {
    this.getMyGadgets()
  }

  getMyGadgets(): void{
    this.afStorage.collection('products').ref.where('category','==','гаджети').onSnapshot(
      collection => {
        this.userGadgets = [];
        collection.forEach(document => {
          const data=document.data() as IProduct;
          const id = document.id;
          this.userGadgets.push({ id, ...data })
         
        })
        setTimeout(() => { window.scroll(0, 1)},400)
      }
    )
  }

  
}
