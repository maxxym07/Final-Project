import { Pipe, PipeTransform } from '@angular/core';
import { IOrder } from '../interfaces/order.interface';

@Pipe({
  name: 'orderSearch'
})
export class OrderSearchPipe implements PipeTransform {

  transform(order: Array<IOrder>, searchString: string): unknown {
    if (!order) {
      return null
    }
    if (!searchString) {
      return order;
    }
    return order.filter(elem =>
      elem.id.toString().includes(searchString.toLowerCase())
      || elem.userName.toLowerCase().includes(searchString.toLowerCase())
      || elem.userPhone.toLowerCase().includes(searchString.toLowerCase())
      || elem.totalPayment.toString().includes(searchString.toLowerCase())
      || elem.dateOrder.toString().includes(searchString.toLowerCase())
    )
  }

}
