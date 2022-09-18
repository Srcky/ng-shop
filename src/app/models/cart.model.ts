import { ProductModel } from './product.model';

// export interface CartModel {
//   id: number;
//   products: {
//     id: number;
//     quantity: number;
//   }[];
// }
export interface InCartModel {
  item: ProductModel;
  qty: number;
}
