import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';
import { Observable, Subscription } from 'rxjs';
import { ShopApiService } from '../services/shop-api.service';

@Component({
  selector: 'app-product-list',
  styleUrls: ['./product-list.component.scss'],
  templateUrl: 'product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(
    private productService: ProductService,
    private shopApiService: ShopApiService
  ) {}

  private subscription: Subscription = new Subscription();

  products$: Observable<ProductModel[]> = this.productService.getProducts$;
  loading$ = this.productService.loading$;
  error = null;

  ngOnInit(): void {
    this.loadRecommended();
  }

  loadRecommended(): void {
    this.subscription.add(
      this.shopApiService.getRecommendedProducts().subscribe(
        products => {
          this.productService.loadProducts(products);
        },
        error => {
          this.error = error;
        }
      )
    );
  }

  addToCart(product: ProductModel): void {
    this.productService.onAddToCart(product);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
