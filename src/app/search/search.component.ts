import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  filter,
} from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { ShopApiService } from '../services/shop-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private shopApiService: ShopApiService
  ) {}

  searchForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchQuery: '',
    });

    this.searchForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged((a, b) => a === b),
        filter(data => data.searchQuery.length >= 4),
        tap(_ => this.productService.setLoading(true)),
        switchMap(data => this.shopApiService.searchProducts(data)),
        tap(_ => this.productService.setLoading(false))
      )
      .subscribe(products => {
        this.productService.loadProducts(products);
      });
  }
}
