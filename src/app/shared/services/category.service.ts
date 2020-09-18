import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore) { }

  getFireCloudCategory():Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('categories').snapshotChanges()
  }

  postFireCloudCategory(category:ICategory):Promise<DocumentReference>{
    return this.firestore.collection('categories').add(category);
  }

  deleteFireCloudCategory(index:any):Promise<void>{
    return this.firestore.collection('categories').doc(index).delete();
  }



}
