import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BannerComponent } from './banner/banner.component';
import { SearchComponent } from './search/search.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { cartReducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductListComponent,
    BannerComponent,
    SearchComponent,
    DiscountsComponent,
    MainComponent,
    AdminComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
    StoreModule.forRoot(cartReducers),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
