import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CategoryService } from '../../shared/services/category.service';
import { ProductService } from '../../shared/services/product.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { IUndercategory } from '../../shared/interfaces/underCategory.interface';
import { UnderCategoryService } from '../../shared/services/under-category.service';
import { Product } from '../../shared/models/product.model';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  modalRef: BsModalRef;
  // config = {
  //   ignoreBackdropClick: true
  // }
  adminProduct: Array<IProduct> = [];
  categories: Array<ICategory> = [];
  underCategories: Array<IUndercategory> = [];

  productCategory: ICategory;///то прості категорії
  categoryName="виберіть категорію..";
  productUnderCategory: IUndercategory;/////тут треба передати в категорії щось
  underCategoryName="виберіть підкатегорію..";

  productID = 1;
  productNameEN: string;
  productNameUA: string;
  productDescription: string;
  productMainPrice: number;
  productOldPrice: number;
  productSize: string;
  productTop = false;
  productPsPlus = false;

  productImageMain : string='';
  productImage2: string = '';
  productImage3: string = '';
  productImage4: string = '';

  uploadProgressMain: Observable<number>;
  uploadProgress2: Observable<number>;
  editStatus: boolean;
  forThirdImages: boolean;
  forFourthImages: boolean;

  inputS: string//for search in table

  constructor(
    private modalService: BsModalService,
    private catService: CategoryService,
    private prodService: ProductService,
    private underCatService: UnderCategoryService,
    private afStorage: AngularFireStorage,) { }

  ngOnInit(): void {
    this.adminFirebaseCategories();
    this.adminFirebaseProducts();
    this.adminFirebaseUnderCategories();
  }


/////////////////////////категорія////////////////////////////
  private adminFirebaseCategories(): void {
    this.catService.getFireCloudCategory().subscribe(
      collection => {
        this.categories = collection.map(category => {
          const data = category.payload.doc.data() as ICategory;
          const id = category.payload.doc.id;
          return { id, ...data };
        })
      }
    )
  }
/////////////////////////категорія////////////////////////////


///////////////підкатегорія//////////////
  private adminFirebaseUnderCategories(): void {
    this.underCatService.getFirecloudUnderCategory().subscribe(
      collection => {
        this.underCategories = collection.map(undCat => {
          const data = undCat.payload.doc.data() as IUndercategory;
          const id = undCat.payload.doc.id;
          return { id, ...data };
        })
      }
    )
  }
///////////////підкатегорія//////////////


  ////////////////////////продукт////////////////////////////////////
  private adminFirebaseProducts(): void {
    this.prodService.getFirecloudProduct().subscribe(
      collection => {
        this.adminProduct = collection.map(product => {
          const data = product.payload.doc.data() as IProduct;
          const id = product.payload.doc.id;
          return { id, ...data };
        })
      }
    )
  }
  ////////////////////////продукт////////////////////////////////////

  

  setCategory(): void {
    this.productCategory = this.categories.filter(cat => cat.nameUA === this.categoryName)[0];
  }

  setUnderCategory(): void {
    this.productUnderCategory = this.underCategories.filter(cat => cat.ukrName === this.underCategoryName)[0];
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered modal-product' });
  }

  addProduct(): void {
    const product: IProduct = new Product(
      this.productID,
      this.productCategory,
      this.productUnderCategory,
      this.productNameEN,
      this.productNameUA,
      this.productDescription,
      this.productMainPrice,
      this.productOldPrice,
      this.productSize,
      this.productTop,
      this.productPsPlus,
      this.productImageMain,
      this.productImage2
    );
    // if (!this.editStatus) {
    //   if (this.productNameEN && this.productNameUA && this.productPrice && this.categoryName !== "choose category..") {
    //     delete product.id
    //     // this.prodService.postJSONProduct(product).subscribe(
    //     //   () => {
    //     //     this.getProducts()
    //     //   }
    //     // )
        this.prodService.postFirecloudProduct(Object.assign({},product))
        this.resetForm()
    //   }
    //   else {
    //     alert('Головні поля НЕ ЗАПОВНЕНІ  (Category,Name EN, Name UA, Price)')
    //   }
    // }
    // else {
    //   // this.prodService.updateJSONProduct(product).subscribe(
    //   //   () => {
    //   //     this.adminFirebaseProducts();
    //   //   }
    //   // );
    //   if (this.productNameEN && this.productNameUA && this.productPrice && this.categoryName !== "choose category..") {
    //     this.prodService.updateFireCloudProduct(Object.assign({},product))
    //     this.editStatus = false;
    //     this.resetForm()
    //   }
    //   else {
    //     alert('Головні поля НЕ ЗАПОВНЕНІ  (Category,Name EN, Name UA, Price)')
    //   }
    // }
  }


  uploadFile(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    this.editStatus = false;
    const filePath = `images/${name}.${type}`;
    const task = this.afStorage.upload(filePath, file);
       this.uploadProgressMain = task.percentageChanges()
  
    task.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => { 
        this.productImageMain=url
        this.editStatus = true;
      })
    })
  }

  uploadFile2(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    this.editStatus = false;
    const filePath = `images/${name}.${type}`;
    const task = this.afStorage.upload(filePath, file);
    task.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => { 
        this.productImage2=url
        this.editStatus = true;
        this.forThirdImages = true;
      })
    })
  }

  uploadFile3(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    this.forThirdImages = false;
    const filePath = `images/${name}.${type}`;
    const task = this.afStorage.upload(filePath, file);
    task.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => { 
        this.productImage3=url
        this.forThirdImages = true;
        this.forFourthImages = true;
      })
    })
  }

  uploadFile4(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    this.forFourthImages = false;
    const filePath = `images/${name}.${type}`;
    const task = this.afStorage.upload(filePath, file);
    task.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => { 
        this.productImage4=url
        this.forFourthImages = true;
      })
    })
  }


  setAttr() {
    let top = <HTMLInputElement>document.getElementById('productTop');
    top.checked
      ? this.productTop = true
      : this.productTop = false;

  }
  setAttr1() {
    let psPlus = <HTMLInputElement>document.getElementById('productPsPlus');
    if (psPlus.checked) {
      this.productPsPlus = true;
      this.productMainPrice = 0;
   }
    else {
      this.productPsPlus = false;
      this.productMainPrice = null;
    }
  }


  editModal(template: TemplateRef<any>, product: IProduct): void {
    // this.editStatus = true;
    // this.modalRef = this.modalService.show(template, this.config);
    // this.productID = product.id
    // this.categoryName = "choose category..";
    // this.productNameEN = product.nameEN
    // this.productNameUA = product.nameUA
    // this.productDescription = product.description
    // this.productWeight = product.weight
    // this.productPrice = product.price
    // this.productImage = product.image
    // this.imageStatus = true;
  }

  // uploadFile(event): void {
  //   const file = event.target.files[0];
  //   const type = file.type.slice(file.type.indexOf('/') + 1);
  //   const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
  //   this.imageStatus = false;
  //   const filePath = `images/${name}.${type}`;
  //   const task = this.afStorage.upload(filePath, file);
  //   this.uploadProgress = task.percentageChanges();
  //   task.then(image => {
  //     this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
  //       this.productImage = url;
  //       this.imageStatus = true;
  //     });
  //   });
  // }


  deleteModal(template: TemplateRef<any>, product: IProduct): void {
    // this.modalRef = this.modalService.show(template, this.config);
    // this.delete_id = product.id
  }

  deleteProduct(): void {
    // this.prodService.deleteFireCloudProduct(this.delete_id)
    // this.modalService.hide(1);
  }

  //sort pipe
  setOrder(value: string) {
    // if (this.order === value) {
    //   this.reverse = !this.reverse;
    // }
    // this.order = value;
  }
  //sort pipe

  closeModal(): void {
    // this.modalService.hide(1);
    // this.productNameEN = '';
    // this.productNameUA = '';
    // this.productDescription = '';
    // this.productWeight = '';
    // this.productImage = '';
    // this.productPrice = null;
    // this.imageStatus = false;
    // this.categoryName = "choose category..";
    // this.editStatus = false;
  }

  //clear form
  private resetForm(): void {
    // this.productNameEN = '';
    // this.productNameUA = '';
    // this.productDescription = '';
    // this.productWeight = '';
    // this.productImage = '';
    // this.categoryName = "choose category..";
    // this.productPrice = null;
    // this.imageStatus = false;
    // this.modalService.hide(1);
  }



}
