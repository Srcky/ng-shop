import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService) {}

  private subscription: Subscription = new Subscription();
  productsInCart$: Observable<ProductModel> = this.productService.addToCart$;
  productsInCart: { inCart: ProductModel; qty: number }[] = [];
  cartTotal = 0;

  ngOnInit(): void {
    this.checkProductAdd();
  }

  checkProductAdd(): void {
    this.subscription.add(
      this.productsInCart$.subscribe(product => {
        const productInCart = { inCart: product, qty: 1 };
        if (
          this.productsInCart.findIndex(
            prod => product.id === prod.inCart.id
          ) === -1
        ) {
          this.productsInCart.push(productInCart);
        } else {
          this.productsInCart.find(prod =>
            product.id === prod.inCart.id ? prod.qty++ : null
          );
        }
        this.calculateTotal(this.productsInCart);
      })
    );
  }

  removeProduct(index: number): void {
    this.productsInCart.splice(index, 1);
    this.calculateTotal(this.productsInCart);
  }

  calculateTotal(cartProducts: { inCart: ProductModel; qty: number }[]): void {
    this.cartTotal = cartProducts.reduce(
      (sum, prod) => sum + prod.inCart.price * prod.qty,
      0
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
