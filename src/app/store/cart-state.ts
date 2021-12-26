import { InCartModel } from '../models/cart.model';
import { ProductModel } from '../models/product.model';

export interface AppState {
  cart: CartState;
}

export interface CartState {
  productsInCart: InCartModel[];
}
