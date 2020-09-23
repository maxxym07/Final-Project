import { Pipe, PipeTransform } from '@angular/core';
import { IUndercategory } from '../interfaces/underCategory.interface';

@Pipe({
  name: 'subcategorySearch'
})
export class SubcategorySearchPipe implements PipeTransform {

  transform(subcategory: Array<IUndercategory>, searchString: string): unknown {
    if (!subcategory) {
      return null
    }
    if (!searchString) {
      return subcategory;
    }
    return subcategory.filter(elem => elem.id.toString().includes(searchString.toLowerCase())
   ||  elem.engName.toLowerCase().includes(searchString.toLowerCase())
   ||  elem.ukrName.toLowerCase().includes(searchString.toLowerCase())
   )
  }

}
