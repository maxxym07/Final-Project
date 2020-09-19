import { ICategory } from './category.interface';
import { IUndercategory } from './underCategory.interface';
export interface IProduct{
    id: number;
    category: ICategory;
    underCategory: IUndercategory;
    nameEN: string;
    nameUA: string;
    description: string;
    mainPrice: number;
    oldPrice?: number;
    size?: string;
    top: boolean;
    psPlus: boolean;
    image1: string;
    image2?: string;
    image3?: string;
    image4?: string;
    image5?: string;
    count: number;
}