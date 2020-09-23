import { Component, OnInit, TemplateRef } from '@angular/core';
import { IOrder } from '../../shared/interfaces/order.interface';
import { IProduct } from '../../shared/interfaces/product.interface';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrderService } from '../../shared/services/order.service';
import { Order } from '../../shared/models/order.model';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  modalRef: BsModalRef;
  inputS: string;
   //for sort
   reverse: boolean = true;
   order: string = 'dateOrder';
   //for sort

  adminOrders: Array<IOrder> = [];
  ordDetails: IOrder;

  adminProducts: Array<IProduct> = [];

  orderID = 1;
  orderStatus: string;
  orderName: string; //for modal aboutUser
  orderLastName: string;
  orderPhone: string; //for modal aboutUser
  orderEmail: string; //for modal aboutUser
  orderData: string;
  orderPrice :number;

  editStatus: boolean;
  orderStatus1: boolean;
  orderStatus2: boolean;

  constructor(private modalService: BsModalService,
    private orderService: OrderService,
    private prodService: ProductService,) { }

  ngOnInit(): void {
    this.getOrders();
  }

  private getOrders(): void {
    this.orderService.getFirecloudOrder().subscribe(collection => {
      this.adminOrders = collection.map(order => {
        const data = order.payload.doc.data() as IOrder;
        const id = order.payload.doc.id;
        return { id, ...data };
      });
    }
    );
  }

  openDetailsModal(order: IOrder, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      { class: 'modal-dialog-centered modal-order' });
      this.orderID = order.id;
    this.ordDetails = order;
    this.orderName = this.ordDetails.userName;
    this.orderLastName = this.ordDetails.userLastName;
    this.orderPhone = this.ordDetails.userPhone;
    this.orderEmail = this.ordDetails.userEmail;
    this.adminProducts = order.ordersDetails;
    this.orderPrice = order.totalPayment;
    this.orderData = order.dateOrder;
    this.editStatus = false;
    this.orderStatus1 = false;
    this.orderStatus2 = false;
  }

  // сумування вартості товарів
  private getTotal(): void {
    this.orderPrice = this.adminProducts.reduce((total, prod) => {
      return total + (prod.mainPrice * prod.count);
    }, 0);
  }
  // 

  changeOrderStatus(ordDetails: IOrder, status: boolean): void {
    status == true ? ordDetails.status = 'Прийнято' : ordDetails.status = 'Відхилено';
    this.orderStatus = ordDetails.status
    this.saveOrder()
    if (status == true) {
      this.orderStatus1 = true;
    }
    if (status == false) {
      this.orderStatus2 = true;
   }
  }

  productCount(product: IProduct, status: boolean): void {
    if (status) {
      product.count++;
    }
    else {
      if (product.count > 1) {
        product.count--;
      }
    }
    this.getTotal();
  }

  completeOrder(order: IOrder): void {
    order.status = 'Завершено'
    this.orderStatus= order.status
  }

  deleteOrder(order: IOrder): void {
    this.orderService.deleteFirecloudOrder(order.id);
    this.getOrders();
  }

  deleteProduct(product: IProduct): void {
    if (confirm('Are you sure')) {
      const index = this.adminProducts.findIndex(prod => prod.id === product.id);
      this.adminProducts.splice(index, 1);
      this.getTotal();
      this.orderService.basket.next('check');
      this.saveOrder()
    }
  }


  private saveOrder() {
    this.editStatus= true;
    const order: IOrder = new Order(
      this.orderID,
      this.orderName,
      this.orderLastName,
      this.orderPhone,
      this.orderEmail,
      this.adminProducts,
      this.orderPrice,
      this.orderData,
      this.orderStatus);

    this.orderService.updateFirecloudOrder(Object.assign({}, order));
    this.modalService.hide(1)
    if (this.orderPrice == 0) {
      alert('Замовлення пусте і буде автоматично видалено!')
      this.deleteOrder(order)
      this.modalService.hide(1)
    }
  }


  //for sort
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
  //for sort
}
