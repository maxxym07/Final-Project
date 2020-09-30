import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-game-consoles',
  templateUrl: './game-consoles.component.html',
  styleUrls: ['./game-consoles.component.scss']
})
export class GameConsolesComponent implements OnInit {
  p: number = 1;
  userConsoles: Array<IProduct> = [];

  constructor( private afStorage: AngularFirestore,) { }

  ngOnInit(): void {
    this.getMyConsoles()    
  }

  getMyConsoles(): void{
    this.afStorage.collection('products').ref.where('category','==','консолі').onSnapshot(
      collection => {
        this.userConsoles = [];
        collection.forEach(document => {
          const data=document.data() as IProduct;
          const id = document.id;
          this.userConsoles.push({ id, ...data })
        })
        setTimeout(() => { window.scroll(0, 1)},400)
      }
    )
  }
}
