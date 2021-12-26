import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductModel } from '../models/product.model';
import { CartState } from '../store/cart-state';
import * as fromAction from '../store/actions/cart.action';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(protected store: Store<CartState>) {}

  private getProductsSource: BehaviorSubject<ProductModel[]> =
    new BehaviorSubject<ProductModel[]>([]);
  readonly getProducts$ = this.getProductsSource.asObservable();

  private cartStateSource: Subject<ProductModel> = new Subject<ProductModel>();
  readonly cartState$ = this.cartStateSource.asObservable();

  private loadingSource: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  readonly loading$ = this.loadingSource.asObservable();

  loadProducts(products: ProductModel[]): void {
    this.getProductsSource.next(products);
  }

  setCartState(product: ProductModel): void {
    this.cartStateSource.next(product);
  }

  setLoading(loading: boolean): void {
    this.loadingSource.next(loading);
  }

  addToCart(product: ProductModel) {
    this.store.dispatch(new fromAction.AddProduct(product));
  }
}
