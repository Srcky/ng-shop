import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ProductService } from '../services/product.service';
import { ProductModel } from '../models/product.model';
import { Observable, Subscription } from 'rxjs';

import { ShopApiService } from '../services/shop-api.service';

@Component({
  selector: 'app-product-list',
  styleUrls: ['./product-list.component.scss'],
  templateUrl: 'product-list.component.html',
  animations: [
    trigger('moveToCart', [
      state(
        'initial',
        style({
          transform: 'translateX(0) translateY(0)',
        })
      ),
      state(
        'inCart',
        style({
          transform: `translateX({{coordX}}px) translateY({{coordY}}px)`,
        }),
        { params: { coordX: 0, coordY: 0 } }
      ),

      transition('initial => inCart', animate(500)),
      transition('inCart => initial', animate(500)),
    ]),
  ],
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(
    private productService: ProductService,
    private shopApiService: ShopApiService
  ) {}

  private subscription: Subscription = new Subscription();
  animationState: string[] = [];

  @ViewChild('productDiv') productElem?: ElementRef<HTMLElement>;

  products$: Observable<ProductModel[]> = this.productService.getProducts$;
  loading$ = this.productService.loading$;
  miniCartCoordinates: { x: number; y: number } = { x: 0, y: 0 };
  error = null;

  ngOnInit(): void {
    this.loadRecommended();
  }

  loadRecommended(): void {
    this.subscription.add(
      this.shopApiService.getRecommendedProducts().subscribe(
        products => {
          this.productService.loadProducts(products);
          products.forEach(_ => this.animationState.push('initial'));
        },
        error => {
          this.error = error;
        }
      )
    );
  }

  addToCart(product: ProductModel, index: number): void {
    this.productService.getminiCartPos$.subscribe(
      (coords: { x: number; y: number }) => {
        const prodCoordX: number =
          this.productElem?.nativeElement.getBoundingClientRect().x || 0;
        const prodCoordY: number =
          this.productElem?.nativeElement.getBoundingClientRect().y || 0;
        const actualX = coords.x - prodCoordX;
        const actualY = coords.y - prodCoordY;
        this.miniCartCoordinates = { x: actualX, y: actualY };
      }
    );
    this.animationState[index] === 'inCart'
      ? this.animationState.splice(index, 1, 'initial')
      : this.animationState.splice(index, 1, 'inCart');
    this.productService.addToCart(product);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
