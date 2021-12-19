import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private getProductsSource: BehaviorSubject<ProductModel[]> =
    new BehaviorSubject<ProductModel[]>([]);
  readonly getProducts$ = this.getProductsSource.asObservable();

  private cartStateSource: Subject<ProductModel> = new Subject<ProductModel>();
  readonly cartState$ = this.cartStateSource.asObservable();

  private loadingSource: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  readonly loading$ = this.loadingSource.asObservable();

  constructor() {}

  loadProducts(products: ProductModel[]): void {
    this.getProductsSource.next(products);
  }

  setCartState(product: ProductModel): void {
    this.cartStateSource.next(product);
  }

  setLoading(loading: boolean): void {
    this.loadingSource.next(loading);
  }
}
