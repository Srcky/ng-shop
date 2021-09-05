import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductModel } from '../models/product.model';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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

  getProducts(): Observable<ProductModel[]> {
    const url = `${this.mainUrl}/recommendeds`;
    return this.http.get<ProductModel[]>(url).pipe(
      catchError(error => {
        return throwError(JSON.stringify(error));
      }),
      tap(_ => {
        this.productService.setLoading(false);
      })
    );
  }

  searchProducts(keyword: { searchQuery: string }): Observable<ProductModel[]> {
    const url = `${this.mainUrl}/products`;
    return this.http.get<ProductModel[]>(url, {
      params: new HttpParams().set('q', keyword.searchQuery),
    });
  }
}
