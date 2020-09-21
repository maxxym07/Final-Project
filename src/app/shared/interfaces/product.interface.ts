export interface IProduct{
    id: number;
    category: string;
    subCategory: string;
    nameEN: string;
    nameUA: string;
    description: string;
    mainPrice: number;
    oldPrice?: number;
    size?: string;
    top: boolean;
    psPlus: boolean;
    // freeProd?: boolean;
    image1: string;
    image2?: string;
    image3?: string;
    image4?: string;
    image5?: string;
    count: number;
}