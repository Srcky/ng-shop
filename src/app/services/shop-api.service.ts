import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProductModel } from '../models/product.model';
import { User } from '../models/user.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ShopApiService {
  private mainUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  getRecommendedProducts(): Observable<ProductModel[]> {
    const url = `${this.mainUrl}/recommendations`;
    return this.http.get<ProductModel[]>(url).pipe(
      catchError(error => {
        return throwError(JSON.stringify(error));
      }),
      tap(_ => {
        this.productService.setLoading(false);
      }),
      catchError(error => {
        return throwError(JSON.stringify(error));
      })
    );
  }

  searchProducts(keyword: { searchQuery: string }): Observable<ProductModel[]> {
    const url = `${this.mainUrl}/products`;
    return this.http
      .get<ProductModel[]>(url, {
        params: new HttpParams().set('q', keyword.searchQuery),
      })
      .pipe(
        catchError(error => {
          return throwError(JSON.stringify(error));
        })
      );
  }

  getUser(userId: User): Observable<User[]> {
    const url = `${this.mainUrl}/users/${userId}`;
    return this.http.get<User[]>(url).pipe(
      catchError(error => {
        return throwError(JSON.stringify(error));
      })
    );
  }
}
