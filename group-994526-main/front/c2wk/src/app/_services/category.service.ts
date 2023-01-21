import { IProduct } from 'src/app/_interfaces/product';
import { ICategory } from './../_interfaces/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/category/';

  private url_product_by_cat = 'http://localhost:3000/product/category/';

  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.url + 'all');
  }

  getProductByCategory(id: any): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url_product_by_cat + id);
  }
}
