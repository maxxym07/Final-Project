import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUndercategory } from '../interfaces/underCategory.interface';

@Injectable({
  providedIn: 'root'
})
export class UnderCategoryService {

  constructor(private firestore:AngularFirestore) { }

  getFirecloudUnderCategory(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('underCategories').snapshotChanges()
  }

  postFirecloudUnderCategory(underCategory:IUndercategory):Promise<DocumentReference>{
    return this.firestore.collection('underCategories').add(underCategory);
  }

  deleteFirecloudUnderCategory(index:any): Promise<void> {
    return this.firestore.collection('underCategories').doc(index).delete();
  }

}
