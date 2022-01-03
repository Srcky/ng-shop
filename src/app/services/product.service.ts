import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductModel } from '../models/product.model';
import { AppState } from '../store/cart-state';
import * as fromAction from '../store/actions/cart.action';
import { InCartModel } from '../models/cart.model';
import { selectProductsInCart } from '../store/selectors/cart.selector';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(protected store: Store<AppState>) {}

  private getProductsSource: BehaviorSubject<ProductModel[]> =
    new BehaviorSubject<ProductModel[]>([]);
  readonly getProducts$ = this.getProductsSource.asObservable();

  private loadingSource: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  readonly loading$ = this.loadingSource.asObservable();

  inCartState$: Observable<InCartModel[]> =
    this.store.select(selectProductsInCart);

  loadProducts(products: ProductModel[]): void {
    this.getProductsSource.next(products);
  }

  addToCart(product: ProductModel): void {
    this.store.dispatch(new fromAction.AddProduct(product));
  }

  removeFromCart(index: number): void {
    this.store.dispatch(new fromAction.RemoveProduct(index));
  }

  setLoading(loading: boolean): void {
    this.loadingSource.next(loading);
  }
}
