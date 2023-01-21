import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct, IManyProduct, ISingleProduct } from '../_interfaces/product';
import { IApi } from '../_interfaces/api';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:3000/product/';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url + 'all_products');
  }

  getProduct(product_id: number): Observable<IProduct> {
    console.log('service');
    return this.http.get<IProduct>(this.url + product_id);
  }

  getProductByCategory(category_id: any): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url + 'category/' + category_id);
  }

  getProductByUser(user_id: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url + 'products_user/' + user_id);
  }

  addProduct(product: IProduct): Observable<any> {
    return this.http.post<any>(this.url + 'create', product);
  }

  updateProduct(product: IProduct): Observable<any> {
    return this.http.put<any>(this.url + product.id_product, product);
  }

  deleteProduct(product_id: number): Observable<any> {
    return this.http.delete<any>(this.url + product_id);
  }

  uploadImage(image: any): Observable<any> {
    return this.http.post<any>(this.url + 'upload', image);
  }
}
