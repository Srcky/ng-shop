import { InCartModel } from '../models/cart.model';

export interface AppState {
  cart: CartState;
}

export interface CartState {
  productsInCart: InCartModel[];
}
