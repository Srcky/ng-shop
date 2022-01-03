import { CartState } from '../cart-state';
import * as fromAction from '../actions/cart.action';
import { InCartModel } from 'src/app/models/cart.model';

export const initialState: CartState = {
  productsInCart: [],
};

export function cartReducer(
  state = initialState,
  action: fromAction.CartAction
): CartState {
  let cartState = JSON.parse(JSON.stringify(state.productsInCart));
  switch (action.type) {
    case fromAction.ADD_PRODUCT: {
      const SelectedProductIndex = cartState.findIndex(
        (prod: InCartModel) => action.payload.id === prod.inCart.id
      );
      if (SelectedProductIndex === -1) {
        cartState = [...cartState, { inCart: { ...action.payload }, qty: 1 }];
      } else {
        const selectedProduct: InCartModel = cartState.find(
          (prod: InCartModel) =>
            action.payload.id === prod?.inCart.id ? prod.qty++ : null
        );
        // replace current product with the one with updated qty
        cartState[cartState.indexOf(SelectedProductIndex)] = selectedProduct;
      }
      return {
        ...state,
        productsInCart: cartState,
      };
    }
    case fromAction.REMOVE_PRODUCT: {
      if (cartState[action.payload].qty === 1) {
        cartState.splice(action.payload, 1);
      } else {
        cartState[action.payload].qty--;
      }
      return {
        ...state,
        productsInCart: cartState,
      };
    }
  }
  return state;
}

// export const getProductsInCart = (state: CartState) => state.productsInCart;
