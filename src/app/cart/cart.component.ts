import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { InCartModel } from '../models/cart.model';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { CartState } from '../store/cart-state';

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
    // quantity of 1 in cart means it should be removed from cart completely on removeProduct
    // if (product?.qty === 1) {
    //   this.productsInCart.splice(index, 1);
    // } else {
    //   this.productsInCart.find(prod => {
    //     return product?.inCart?.id === prod.inCart.id ? prod.qty-- : null;
    //   });
    // }
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
