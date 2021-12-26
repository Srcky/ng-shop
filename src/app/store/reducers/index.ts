import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../cart-state';
import * as fromCartReducer from './cart.reducer';

// export function getReducers(): ActionReducerMap<AppState> {
//   return {
//     cart: fromCartReducer.cartReducer,
//   };
// }

export const cartReducers: ActionReducerMap<AppState, any> = {
  cart: fromCartReducer.cartReducer,
};
