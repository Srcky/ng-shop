import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InCartModel } from '../models/cart.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService) {}

  private subscription: Subscription = new Subscription();
  inCartState$: Observable<InCartModel[]> = this.productService.inCartState$;
  productsInCart: InCartModel[] = [];
  cartTotal = 0;

  ngOnInit(): void {
    this.subscription.add(
      // had to unpack it here instead of in template, bcs of calculate method
      this.inCartState$
        .pipe(
          tap(cartProducts => {
            this.productsInCart = cartProducts;
            this.calculateTotal(cartProducts);
          })
        )
        .subscribe()
    );
  }

  removeProduct(index: number, product: InCartModel): void {
    this.productService.removeFromCart(index);
    this.calculateTotal(this.productsInCart);
  }

  calculateTotal(cartProducts: InCartModel[]): void {
    this.cartTotal = cartProducts.reduce(
      (sum, prod) =>
        sum + (prod.inCart.price - prod.inCart.discount) * prod.qty,
      0
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
