import { Action } from '@ngrx/store';
import { InCartModel } from '../../models/cart.model';
import { ProductModel } from '../../models/product.model';

export const ADD_PRODUCT = '[Cart] Add Product';
export const REMOVE_PRODUCT = '[Cart] Remove Product';
export const UPDATE_PRODUCT = '[Cart] Update Product';

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;
  constructor(public payload: ProductModel) {}
}

export class RemoveProduct implements Action {
  readonly type = REMOVE_PRODUCT;
  constructor(public payload: number) {}
}

export class UpdateProduct implements Action {
  readonly type = UPDATE_PRODUCT;
  constructor(public payload: ProductModel) {}
}

export type CartAction = AddProduct | RemoveProduct | UpdateProduct;
