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

  private addToCartSource: Subject<ProductModel> = new Subject<ProductModel>();
  readonly addToCart$ = this.addToCartSource.asObservable();

  private searchProgressSource: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  readonly searchProgress$ = this.searchProgressSource.asObservable();

  private loadingSource: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  readonly loading$ = this.loadingSource.asObservable();

  constructor() {}

  loadProducts(products: ProductModel[]): void {
    this.getProductsSource.next(products);
  }

  onAddToCart(product: ProductModel): void {
    this.addToCartSource.next(product);
  }

  searchInProgress(searching: boolean): void {
    this.searchProgressSource.next(searching);
  }

  setLoading(loading: boolean): void {
    this.loadingSource.next(loading);
  }
}
