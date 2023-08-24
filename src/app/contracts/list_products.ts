import { ListProductImage } from "./list_product_image";

export class ListProduct {
    id: string;
    name: string;
    price: number;
    stock: number;
    createDate: Date;
    updateDate: Date;
    productImages: ListProductImage[];
}

export class ListProductResponse {
    totalProduct: number;
    listProduct: ListProduct[];
}