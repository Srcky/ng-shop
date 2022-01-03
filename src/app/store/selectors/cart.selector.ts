import { createSelector } from '@ngrx/store';
import { AppState, CartState } from '../cart-state';

export const selectCart = (state: AppState) => state.cart;

export const selectProductsInCart = createSelector(
  selectCart,
  (state: CartState) => state.productsInCart
);
