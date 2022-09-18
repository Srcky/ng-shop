import { CartState } from '../cart-state';
import * as fromAction from '../actions/cart.action';
import { InCartModel } from 'src/app/models/cart.model';
import { ProductModel } from 'src/app/models/product.model';

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
      console.log(action.payload);
      cartState = [...cartState, { item: { ...action.payload }, qty: 1 }];
      return {
        ...state,
        productsInCart: cartState,
      };
    }
    case fromAction.UPDATE_PRODUCT: {
      const SelectedProductIndex = cartState.findIndex(
        (prod: InCartModel) =>
          (<ProductModel>action.payload).id === prod.item.id
      );
      const selectedProduct: InCartModel = cartState.find(
        (prod: InCartModel) => prod.qty++
      );
      cartState[cartState.indexOf(SelectedProductIndex)] = selectedProduct;
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
