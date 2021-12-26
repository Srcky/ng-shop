import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductModel } from '../models/product.model';
import { AppState, CartState } from '../store/cart-state';
import * as fromAction from '../store/actions/cart.action';
import { InCartModel } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(protected store: Store<AppState>) {}

  private getProductsSource: BehaviorSubject<ProductModel[]> =
    new BehaviorSubject<ProductModel[]>([]);
  readonly getProducts$ = this.getProductsSource.asObservable();

  private cartStateSource: Subject<ProductModel> = new Subject<ProductModel>();
  readonly cartState$ = this.cartStateSource.asObservable();

  private loadingSource: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  readonly loading$ = this.loadingSource.asObservable();

  inCartState$: Observable<CartState> = this.store.select('cart');

  loadProducts(products: ProductModel[]): void {
    this.getProductsSource.next(products);
  }

  addToCart(product: ProductModel) {
    this.store.dispatch(new fromAction.AddProduct(product));
  }

  // setCartState(product: ProductModel): void {
  //   this.cartStateSource.next(product);
  // }

  setLoading(loading: boolean): void {
    this.loadingSource.next(loading);
  }
}
