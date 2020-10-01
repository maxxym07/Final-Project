import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-games-details',
  templateUrl: './games-details.component.html',
  styleUrls: ['./games-details.component.scss']
})
export class GamesDetailsComponent implements OnInit {
  slideIndex = 0;

  userProduct: IProduct

  constructor(private afStorage: AngularFirestore,
    private actRoute: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.getMyProduct();
  }

  currentDiv(n) {
    this.showDivs(this.slideIndex = n);
  }

  showDivs(n) {
    let i;
    let x = document.getElementsByClassName("mySlides1")as HTMLCollectionOf<HTMLElement>;
    if (n > x.length) { this.slideIndex = 1 }
    if (n < 1) {this.slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[this.slideIndex-1].style.display = "block";
  }

  getMyProduct() {
    const nameProduct=this.actRoute.snapshot.paramMap.get('name')
    this.afStorage.collection('products').ref.where('nameEN','==',nameProduct).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data=document.data() as IProduct;
          const id = document.id;
          this.userProduct=({ id, ...data })
        })
      }
    )
   
  }
  

  addBasket(product:IProduct): void{
    this.orderService.addBasketService(product);
  }

}
