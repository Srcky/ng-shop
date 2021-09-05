export interface ProductModel {
  id: number;
  name: string;
  description: string;
  defaultImage: string;
  images: string[];
  price: number;
  discount: number;
}

export interface InCartProductModel extends ProductModel {
  qty: number;
}
