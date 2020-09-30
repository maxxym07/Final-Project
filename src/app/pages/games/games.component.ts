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
  p: number = 1;
  userProducts: Array<IProduct> = []
  userFilterProduct: Array<IProduct> = []


  filterBy: string;
  filterByDetails: string;
  
  constructor(private afStorage: AngularFirestore) { }

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
      this.userFilterProduct=[]
      collection.forEach(document => {
        const data=document.data() as IProduct;
        const id = document.id;
        this.userProducts.push({ id, ...data })
        this.userFilterProduct.push({ id, ...data })
      })
      setTimeout(() => { window.scroll(0,1)},400)
    }
  )
}

resetFilter(){
  this.userFilterProduct=this.userProducts
  
}
  
filterZhanr($event) {
  this.userFilterProduct = [];
  this.filterBy = $event.target.name;
  this.filterByDetails = $event.target.id;
  $event.checked = true;
  this.userProducts.filter(game => game.subCategory.toLowerCase() == this.filterByDetails.toLowerCase()
    ? this.userFilterProduct.push(game) : game )
}

}
