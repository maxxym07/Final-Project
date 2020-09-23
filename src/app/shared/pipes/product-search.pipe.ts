import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(product: Array<IProduct>, searchString: string): unknown {
    if (!product) {
      return null
    }
    if (!searchString) {
      return product;
    }
    return product.filter(elem =>
      elem.id.toString().includes(searchString.toLowerCase())
      || elem.nameEN.toLowerCase().includes(searchString.toLowerCase())
      || elem.nameUA.toLowerCase().includes(searchString.toLowerCase())
      || elem.category.toLowerCase().includes(searchString.toLowerCase())
      || elem.subCategory.toLowerCase().includes(searchString.toLowerCase())
      || elem.oldPrice.toString().includes(searchString.toLowerCase())
      || elem.mainPrice.toString().includes(searchString.toLowerCase())
    )
  }

}
