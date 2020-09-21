import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICoupon } from '../../shared/interfaces/coupon.interface';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderService } from '../../shared/services/order.service';
import { Coupon } from '../../shared/models/coupon.model';

@Component({
  selector: 'app-admin-coupon',
  templateUrl: './admin-coupon.component.html',
  styleUrls: ['./admin-coupon.component.scss']
})
export class AdminCouponComponent implements OnInit {
  modalRef: BsModalRef;
  adminCoupon: Array<ICoupon> = [];
  inputS: string;

  codeID = 1;
  code: string;
  percent: number
  couponStatus: boolean;

  delete_id: number;
  
  constructor(private ordService: OrderService,
    private modalService: BsModalService,) { }

  ngOnInit(): void {
    this.adminFirebaseCoupon()
  }

  private adminFirebaseCoupon(): void{
    this.ordService.getFirecloudCoupon().subscribe(
      collection => {
        this.adminCoupon = collection.map(coupon => {
          const data = coupon.payload.doc.data() as ICoupon;
          const id = coupon.payload.doc.id;
          return {id, ...data}
        })
      }
    )
  }


  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
  }

  addCoupon(): void{
    const newC = new Coupon(this.codeID, this.code, this.percent);
    delete newC.id;
    this.ordService.postFirecloudCoupon(Object.assign({}, newC));
    this.resetForm()
    this.modalService.hide(1);
  }

  deleteModal(template: TemplateRef<any>,coupon:ICoupon): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
    this.delete_id=coupon.id
  }

  deleteCoupon(): void {
    if (confirm('Are you sure?')) {
      this.ordService.deleteFirecloudCoupon(this.delete_id)
      
      this.modalService.hide(1);
    }
  }

  checkInputs(): void{
    if (!this.code || !this.percent) {
      this.couponStatus = false;
    }
    else {
      this.couponStatus = true;
    }
  }

  private resetForm(): void {
    this.codeID = 1;
    this.code = '';
    this.percent = null;
  }

}
