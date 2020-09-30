import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-ps-plus',
  templateUrl: './ps-plus.component.html',
  styleUrls: ['./ps-plus.component.scss']
})
export class PsPlusComponent implements OnInit {

  psPlusProducts: Array<IProduct> = []
  freeProd='0'

  constructor(private afStorage: AngularFirestore,) { }

  ngOnInit(): void {
    this.getPsPlusProducts()
  }

  getPsPlusProducts(){
    this.afStorage.collection('products').ref.where('psPlus', '==', true).onSnapshot(
      collection => {
        this.psPlusProducts=[]
        collection.forEach(document => {
          const data = document.data() as IProduct;
          const id = document.id;
          this.psPlusProducts.push({id, ...data})
        })
        setTimeout(() => { window.scroll(0,1)},500)
      }
    )
  }

}
