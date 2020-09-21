import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  countZhanrs = 0
  menuzhanrs = document.getElementsByClassName('menu-zhanrs') as HTMLCollectionOf<HTMLElement>;
  openStatus: boolean;

  userProducts: Array<IProduct> = []
  
  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private afStorage: AngularFirestore,
    private productService:ProductService,
  ) { }

  ngOnInit(): void {
    this.getGames() 
  }

  openZhanrs(): void{
    this.menuzhanrs[0].style.display = 'table'
    this.countZhanrs++
    this.openStatus=true

    if (this.countZhanrs > 1) {
      this.menuzhanrs[0].style.display = 'none'
      this.countZhanrs = 0
      this.openStatus=false
      
    }
  }

getGames() {
  this.afStorage.collection('products').ref.where('category','==','ігри').onSnapshot(
    collection => {
      this.userProducts = [];
      collection.forEach(document => {
        const data=document.data() as IProduct;
        const id = document.id;
        this.userProducts.push({ id, ...data })
      })
    }
  )
 
}
  
  

}
