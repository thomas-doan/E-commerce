import { ICategory } from './../../../_interfaces/category';
import { CategoryService } from './../../../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import {
  IProduct,
  IManyProduct,
  ISingleProduct,
} from 'src/app/_interfaces/product';

@Component({
  selector: 'app-p-index',
  templateUrl: './p-index.component.html',
  styleUrls: ['./p-index.component.scss'],
})
export class PIndexComponent implements OnInit {
  productList: IProduct[] = [];
  categoryList: ICategory[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.productList = products;
    });
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categoryList = categories;
    });
  }

  delete(id: number | undefined) {
    id = id ?? 0;

    this.productService.deleteProduct(id).subscribe((data) => {
      console.log(`delete = ${data}`);
      this.ngOnInit();
    });
  }
}
