
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { IProduct } from '../models/product.model';

const apiUrl = `${environment.apiUrl}`; 

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public router: Router) {
    console.log('HttpClient injected:', this.http);
  }

  getAllProducts(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + "/Product/GetAllProducts", data, { headers: this.headers });
  }

  deleteProductById(params: any): Observable<any> {
    return this.http.get<any>(apiUrl + "/Product/DeleteProductById", { headers: this.headers, params: params });
  }

  addUpdateCategory(data: any): Observable<any> {
    return this.http.post(apiUrl + '/Category/AddUpdateCategory', data, {
      headers: this.headers,
    });
  }
  getProduct(id: number): Observable<IProduct> {
    if (id === 0) {
      return of(this.initializedClient());
    } else {
      return this.http
        .get<IProduct>(apiUrl + '/Category/GetProductById?ProductId=' + id, {
          headers: this.headers,
        })
        .pipe(
          map((response: any) => {
            return response.result;
          }),
          catchError((err: any, caught: any) => {
            console.error(err);
            throw err;
          })
        );
    }
  }

  private initializedClient(): IProduct {
    return {
      productId: 0,
      productName: '',
      urlSlug:'',
      description: '',
      categoryId: 0,
      price: '',
      stockQuantity: '',
      status:'',
      row: '',
      totalRowCount:'',
      flag: 0
    };
  }
}