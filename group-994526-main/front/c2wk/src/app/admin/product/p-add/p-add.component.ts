import { CategoryService } from './../../../_services/category.service';
import { ICategory } from './../../../_interfaces/category';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';

import { NgForm } from '@angular/forms';
import {
  IProduct,
  IManyProduct,
  ISingleProduct,
} from 'src/app/_interfaces/product';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-p-add',
  templateUrl: './p-add.component.html',
  styleUrls: ['./p-add.component.scss'],
})
export class PAddComponent implements OnInit {
  categoryList: ICategory[] = [];
  product: IProduct = {
    name: '',
    price: 0,
    description: '',
    image: '',
    CategoryId: 0,
    UserIdUser: 0,
  };

  file: any;

  constructor(
    private productService: ProductService,
    private tokenService: TokenService,
    private Router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    let userInfo = this.tokenService.tokenDecrypted();
    console.log(userInfo.fk_role);
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categoryList = categories;
    });
  }

  async onSubmit() {
    const user = this.tokenService.decodeToken();

    this.product.UserIdUser = user.id_user;
    await this.onUpload();
    this.product.image = '/assets/' + this.file.name;

    this.productService.addProduct(this.product).subscribe((data) => {
      /* this.Router.navigate(['admin/product']); */
      let userInfo = this.tokenService.tokenDecrypted();
      console.log(userInfo.fk_role);
      if (userInfo.fk_role == 2) {
        console.log('2');
        this.Router.navigate(['admin/product']);
      } else {
        console.log('valide');

        this.Router.navigate(['dashboard_user']);
        location.reload();

      }
    });
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  async onUpload() {
    const fd = new FormData();

    fd.append('file', this.file, this.file.name);
    this.productService.uploadImage(fd).subscribe((data) => {});
  }
}
