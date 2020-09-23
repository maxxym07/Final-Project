import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICategory } from '../../shared/interfaces/category.interface';
import { CategoryService } from '../../shared/services/category.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  modalRef: BsModalRef;
   //for sort
   order: string = 'id';
   reverse: boolean = false;
   //for sort
  adminCategory: Array<ICategory> = [];
  categoryID = 1;
  nameEN: string;
  nameUA: string;

  categoryStatus = false;//for butDisable

  delete_id: any;

  inputS:string//for search in table

  constructor(private catService: CategoryService,
    private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.adminFirebaseCategories();
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


  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
  }


  addCategory(): void{
    const newC = new Category(this.categoryID, this.nameEN, this.nameUA);
    delete newC.id;
    this.catService.postFireCloudCategory(Object.assign({}, newC));
    this.resetForm()
    this.modalService.hide(1);
  }

  deleteModal(template: TemplateRef<any>,category:ICategory): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
    this.delete_id=category.id
  }

  deleteCategory(): void {
    if (confirm('Are you sure?')) {
      this.catService.deleteFireCloudCategory(this.delete_id)
      
      this.modalService.hide(1);
    }
  }


  checkInputs(): void{
    if (!this.nameUA || !this.nameEN) {
      this.categoryStatus = false;
    }
    else {
      this.categoryStatus = true;
    }
  }

  private resetForm(): void {
    this.categoryID = 1;
    this.nameEN = '';
    this.nameUA = '';
  }

      //sort pipe
      setOrder(value: string) {
        if (this.order === value) {
          this.reverse = !this.reverse;
        }
        this.order = value;
      }
}
