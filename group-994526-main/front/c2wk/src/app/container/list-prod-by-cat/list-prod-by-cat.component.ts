import { IProduct } from 'src/app/_interfaces/product';
import { CategoryService } from './../../_services/category.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-prod-by-cat',
  templateUrl: './list-prod-by-cat.component.html',
  styleUrls: ['./list-prod-by-cat.component.scss'],
})
export class ListProdByCatComponent implements OnInit {
  productListByCat: IProduct[] = [];
  productEmpty: boolean = false;
  uid: any;
  nameCategory: any;
  constructor(
    private activated: ActivatedRoute,
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

  /*   ngOnInit(): void {
         let uid = this.activated.snapshot.paramMap.get('id');

    console.log(uid);
    console.log('test');
    this.categoryService.getProductByCategory(uid).subscribe((res) => {
      this.productListByCat = res;
      console.log(this.productListByCat);
    });

    this.activated.paramMap.subscribe((params) => {
      this.uid = params.get('id');

      this.categoryService.getProductByCategory(this.uid).subscribe((res) => {
        if (res) {
          this.productListByCat = res;
          console.log(this.productListByCat);
        } else {
          this.productEmpty = true;
        }
      });
    });
  } */

  ngOnInit(): void {
    this.activated.paramMap.subscribe((params) => {
      this.uid = params.get('id');

      this.categoryService.getProductByCategory(this.uid).subscribe((res) => {
        if (res) {
          this.productListByCat = res;
          console.log(this.productListByCat);
        }
        if (res.length == 0) {
          this.categoryService.getAllCategories().subscribe((res) => {
            this.nameCategory = res.find((cat) => cat.id == this.uid);
          });

          this.productEmpty = true;
        }
      });
    });
  }
}
