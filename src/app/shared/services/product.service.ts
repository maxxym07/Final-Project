import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { IProduct } from '../interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore:AngularFirestore) { }

  getFirecloudProduct(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('products').snapshotChanges()
  }

  postFirecloudProduct(product:IProduct):Promise<DocumentReference>{
    return this.firestore.collection('products').add(product);
  }

  deleteFirecloudProduct(id:number): Promise<void> {
    return this.firestore.collection('products').doc(id.toString()).delete();
  }

  updateFirecloudProduct(product: IProduct): Promise<void> {
    return this.firestore.collection('products').doc(product.id.toString()).update(product);
  }

}
