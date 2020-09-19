import { IProduct } from '../interfaces/product.interface';
import { ICategory } from '../interfaces/category.interface';
import { IUndercategory } from '../interfaces/underCategory.interface';

export class Product implements IProduct{
    constructor(
      public  id: number,
      public category: ICategory,
      public underCategory: IUndercategory,
      public nameEN: string,
      public nameUA: string,
      public description: string,
      public mainPrice: number,
      public oldPrice: number,
      public size: string,
      public top: boolean,
      public psPlus: boolean,
      public image1: string,
      public image2: string,
      public image3: string,
      public image4: string,
      public image5: string,
      public count: number = 1,
    ){}
}