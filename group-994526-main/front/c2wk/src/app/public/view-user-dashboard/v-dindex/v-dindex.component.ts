import { TokenService } from 'src/app/_services/token.service';
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
  selector: 'app-v-dindex',
  templateUrl: './v-dindex.component.html',
  styleUrls: ['./v-dindex.component.scss'],
})
export class VDIndexComponent implements OnInit {
  productList: IProduct[] = [];
  categoryList: ICategory[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private TokenService: TokenService
  ) {}

  ngOnInit(): void {
    let userInfo = this.TokenService.tokenDecrypted();

    this.productService
      .getProductByUser(userInfo.id_user)
      .subscribe((products) => {
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
