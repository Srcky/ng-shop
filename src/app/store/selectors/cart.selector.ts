import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromCartReducer from '../reducers/cart.reducer';
import { AppState, CartState } from '../cart-state';

// export const getAppState: MemoizedSelector<
//   AppState,
//   CartState
// > = createSelector<AppState>(PRODUCT_ASSIGNMENT_FEATURE);

export const selectCart = (state: AppState) => state.cart;

export const selectProductsInCart = createSelector(
  selectCart,
  (state: CartState) => state.productsInCart
);
