import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';
import { Observable } from 'rxjs';
import { ShopApiService } from '../services/shop-api.service';

@Component({
  selector: 'app-product-list',
  styleUrls: ['./product-list.component.scss'],
  templateUrl: 'product-list.component.html',
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private shopApiService: ShopApiService
  ) {}

  products$: Observable<ProductModel[]> = this.shopApiService.getProducts();
  loading$ = this.productService.loading;

  ngOnInit(): void {}

  addToCart(product: ProductModel): void {
    this.productService.onAddToCart(product);
  }
}
