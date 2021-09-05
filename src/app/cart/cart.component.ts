import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InCartProductModel, ProductModel } from '../models/product.model';
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
  productsInCart: InCartProductModel[] = [];
  cartTotal = 0;

  ngOnInit(): void {
    this.checkProductAdd();
  }

  checkProductAdd(): void {
    this.subscription.add(
      this.productsInCart$.subscribe(product => {
        if (
          this.productsInCart.findIndex(
            (prod: ProductModel) => product.id === prod.id
          ) === -1
        ) {
          this.productsInCart.push({ ...product, qty: 1 });
        } else {
          this.productsInCart.find((prod: InCartProductModel) =>
            prod.id === product.id ? prod.qty++ : null
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

  calculateTotal(cartProducts: InCartProductModel[]): void {
    this.cartTotal = cartProducts.reduce(
      (sum, prod) => sum + prod.price * prod.qty,
      0
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
