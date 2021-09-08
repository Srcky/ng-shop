import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  filter,
} from 'rxjs/operators';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { ShopApiService } from '../services/shop-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private shopApiService: ShopApiService
  ) {}

  private subscription: Subscription = new Subscription();
  searchForm: FormGroup = new FormGroup({});
  noProducts = false;

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchQuery: '',
    });
    this.initiateSearch();
  }

  initiateSearch(): void {
    this.subscription.add(
      this.searchForm.valueChanges
        .pipe(
          debounceTime(1000),
          distinctUntilChanged((a, b) => a.searchQuery === b.searchQuery),
          filter(data => data.searchQuery.length >= 4),
          tap(_ => this.productService.setLoading(true)),
          switchMap(data => this.shopApiService.searchProducts(data)),
          tap(_ => this.productService.setLoading(false))
        )
        .subscribe((products: ProductModel[]) => {
          if (products.length > 0) {
            this.noProducts = false;
            this.productService.loadProducts(products);
          } else {
            this.noProducts = true;
            this.productService.loadProducts([]);
          }
        })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
