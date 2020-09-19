import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from '../../shared/services/category.service';
import { IUndercategory } from '../../shared/interfaces/underCategory.interface';
import { Undercategory } from '../../shared/models/underCategory.model';
import { UnderCategoryService } from '../../shared/services/under-category.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-under-categories',
  templateUrl: './under-categories.component.html',
  styleUrls: ['./under-categories.component.scss']
})
export class UnderCategoriesComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    ignoreBackdropClick: true
  }

  adminCategory: Array<ICategory> = [];
  adminUnderCategories: Array<IUndercategory>=[];
  
 
  underCategoryID = 1;
  engName: string;
  ukrName: string;

  underCategoryName:string; //for select
  category: ICategory;
  underCategoryCategory='ігри';
  // underCategory: ICategory;
  categoryStatus = false;//for butDisable

  delete_id: any;

  inputS:string//for search in table

  constructor(private catService: CategoryService,
    private modalService: BsModalService,
    private UnderCatService: UnderCategoryService,
    private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.adminFirebaseCategories();
    this.adminFirebaseUnderCategories();
  }


  private adminFirebaseCategories(): void{
    this.catService.getFireCloudCategory().subscribe(
      collection => {
        this.adminCategory = collection.map(category => {
          const data = category.payload.doc.data() as ICategory;
          const id = category.payload.doc.id;
          return {id, ...data}
        })
      }
    )
  }

  private adminFirebaseUnderCategories(): void {
    this.UnderCatService.getFirecloudUnderCategory().subscribe(
      collection => {
        this.adminUnderCategories = collection.map(underCat => {
          const data = underCat.payload.doc.data() as IUndercategory;
          const id = underCat.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }


  setCategory(): void {
    this.underCategoryCategory = this.adminCategory.filter(cat => cat.nameUA === this.underCategoryName)[0].nameUA;
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.config);
    this.underCategoryName=this.adminCategory[1].nameUA
  }


  addCategory(): void{
    const newUc: IUndercategory = new Undercategory(
      this.underCategoryID,
      this.underCategoryCategory,
      this.engName,
      this.ukrName);
    delete newUc.id;
    
    this.UnderCatService.postFirecloudUnderCategory(Object.assign({}, newUc))
    // .then(()=>{
    //   this.updateCategory(newUc)
    // })
      this.resetForm()
      this.modalService.hide(1);

  }

  // updateCategory(newUnderCategory:IUndercategory): void{
  //   this.category = this.adminCategory.filter(cat => cat.nameUA === this.underCategoryName)[0];
  //   this.category.underCategory.push(Object.assign({}, newUnderCategory))
  //   console.log(this.category)
  //   this.firestore.collection('categories').doc(this.category.id.toString()).update(Object.assign({}, this.category));
  // }

  deleteModal(template: TemplateRef<any>,underCategory:IUndercategory): void {
    this.modalRef = this.modalService.show(template);
    this.delete_id=underCategory.id
  }

  deleteCategory(): void {
    if (confirm('Are you sure?')) {
      this.UnderCatService.deleteFirecloudUnderCategory(this.delete_id)
      
      this.modalService.hide(1);
    }
  }


  checkInputs(): void{
    if (this.engName && this.ukrName && this. underCategoryName !== "choose category..") {
      this.categoryStatus = true;
    }
    else {
      this.categoryStatus = false;
    }
  }

  private resetForm(): void {
    this.underCategoryID = 1;
    this.underCategoryName = "choose category..";
    this.engName = '';
    this.ukrName = '';
    this.modalService.hide(1);
  }

}
