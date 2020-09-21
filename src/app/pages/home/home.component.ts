import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myIndex = 0;
  topProducts: Array<IProduct> = []
  
  constructor(private afStorage: AngularFirestore,) { }

  ngOnInit(): void {
    this.carousel();
    this.getTopProducts()
  }

  carousel() {
    let i;
    let x = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < x.length; i++) {
      x[i].style.display = 'none';  
    }
    this.myIndex++;
    if (this.myIndex > x.length) {
      this.myIndex = 1
    }    
    x[this.myIndex - 1].style.display = 'block'; 
    setTimeout(()=>{this.carousel()},4000);
  }


  getTopProducts(){
    this.afStorage.collection('products').ref.where('top', '==', true).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data = document.data() as IProduct;
          const id = document.id;
          this.topProducts.push({id, ...data})
        })
      }
    )
  }



}
