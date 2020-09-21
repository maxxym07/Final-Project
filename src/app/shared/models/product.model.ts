import { IProduct } from '../interfaces/product.interface';

export class Product implements IProduct{
    constructor(
      public  id: number,
      public category: string,
      public subCategory: string,
      public nameEN: string,
      public nameUA: string,
      public description: string,
      public mainPrice: number,
      public oldPrice: number,
      public size: string,
      public top: boolean,
      public psPlus: boolean,
      // public freeProd: boolean,
      public image1: string,
      public image2: string,
      public image3: string,
      public image4: string,
      public image5: string,
      public count: number = 1,
    ){}
}