export interface CartModel {
  id: number;
  products: {
    id: number;
    quantity: number;
  }[];
}
