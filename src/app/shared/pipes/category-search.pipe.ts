import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';

@Pipe({
  name: 'categorySearch'
})
export class CategorySearchPipe implements PipeTransform {

  transform(category: Array<ICategory>, searchString: string): unknown {
    if (!category) {
      return null
    }
    if (!searchString) {
      return category;
    }
    return category.filter(elem => elem.id.toString().includes(searchString.toLowerCase())
   ||  elem.nameEN.toLowerCase().includes(searchString.toLowerCase())
   ||  elem.nameUA.toLowerCase().includes(searchString.toLowerCase())
   )
  }

}
