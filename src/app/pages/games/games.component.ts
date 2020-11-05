import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { UnderCategoryService } from '../../shared/services/under-category.service';
import { IUndercategory } from '../../shared/interfaces/underCategory.interface';

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
  underCategories: Array<IUndercategory> = [];

  filterBy: string;
  filterByDetails: string;
  
  constructor(private afStorage: AngularFirestore,) { }

  ngOnInit(): void {
    this.getGames();
    this.getUnderCategories()
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

  private getUnderCategories(): void {
    this.afStorage.collection('underCategories').ref.where('category','==','ігри').onSnapshot(
      collection => {
        this.underCategories = [];
        collection.forEach(document => {
          const data=document.data() as IUndercategory;
          const id = document.id;
          this.underCategories.push({ id, ...data })
        })
        setTimeout(() => { window.scroll(0,1)},400)
      }
    )
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
  let radioButs = document.querySelectorAll("input[type=radio]:checked") as any;

        for (let i = 0; i < radioButs.length; i++) { 
          radioButs[i].checked=false
        }
  this.menuzhanrs[0].style.display = 'none'
  this.countZhanrs = 0
  this.openStatus=false
}
  
filterZhanr($event) {
  this.userFilterProduct = [];
  this.filterBy = $event.target.name;
  this.filterByDetails = $event.target.id;
  $event.checked = true;
  this.userProducts.filter(game => game.subCategory.toLowerCase() == this.filterByDetails.toLowerCase()
    ? this.userFilterProduct.push(game) : game)
  this.menuzhanrs[0].style.display = 'none'
  this.countZhanrs = 0
  this.openStatus=false

}

scrollUp(target:HTMLElement): void{
    target.scrollIntoView()
}

}
