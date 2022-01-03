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
  switch (action.type) {
    case fromAction.ADD_PRODUCT: {
      let cartState = JSON.parse(JSON.stringify(state.productsInCart));
      const payload = action.payload;
      const SelectedProductIndex = cartState.findIndex(
        (prod: InCartModel) => payload.id === prod.inCart.id
      );
      if (SelectedProductIndex === -1) {
        cartState = [...cartState, { inCart: { ...payload }, qty: 1 }];
      } else {
        const selectedProduct: InCartModel = cartState.find(
          (prod: InCartModel) =>
            payload.id === prod?.inCart.id ? prod.qty++ : null
        );
        cartState[cartState.indexOf(SelectedProductIndex)] = selectedProduct;
      }
      return {
        ...state,
        productsInCart: cartState,
      };
    }
    // case fromAction.REMOVE_PRODUCT: {
    //   return {
    //     ...state,
    //   };
    // }
  }
  return state;
}

// export const getProductsInCart = (state: CartState) => state.productsInCart;
