import { IUndercategory } from '../interfaces/underCategory.interface';
import { IProduct } from '../interfaces/product.interface';

export class Undercategory implements IUndercategory{
    constructor(
        public id: number,
        public category: string,
        public engName: string,
        public ukrName: string,
    ){}
}