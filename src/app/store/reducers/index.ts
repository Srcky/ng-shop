import { ActionReducerMap } from '@ngrx/store';
import { CartAction } from '../actions/cart.action';
import { AppState } from '../cart-state';
import * as fromCartReducer from './cart.reducer';

// another way of selecting reducers
// export function getReducers(): ActionReducerMap<AppState, CartAction> {
//   return {
//     cart: fromCartReducer.cartReducer,
//   };
// }

export const cartReducers: ActionReducerMap<AppState, CartAction> = {
  cart: fromCartReducer.cartReducer,
};
