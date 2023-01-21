import { TokenService } from 'src/app/_services/token.service';
import { CategoryService } from './../../../_services/category.service';
import { ICategory } from './../../../_interfaces/category';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  IProduct,
  IManyProduct,
  ISingleProduct,
} from 'src/app/_interfaces/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-p-edit',
  templateUrl: './p-edit.component.html',
  styleUrls: ['./p-edit.component.scss'],
})
export class PEditComponent implements OnInit {
  categoryList: ICategory[] = [];
  product: IProduct = {
    name: '',
    description: '',
    price: 0,
    image: '',
    CategoryId: 0,
    UserIdUser: 0,
  };

  file: any;

  constructor(
    private activated: ActivatedRoute,
    private productService: ProductService,
    private Router: Router,
    private categoryService: CategoryService,
    private TokenService: TokenService
  ) {}

  ngOnInit(): void {
    const product_id = +(this.activated.snapshot.paramMap.get('id') ?? 0);
    this.productService.getProduct(product_id).subscribe((data) => {
      this.product = data;
    });
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categoryList = categories;
    });
  }

  async onSubmit() {
    await this.onUpload();
    this.productService.updateProduct(this.product).subscribe((data) => {
      let userInfo = this.TokenService.tokenDecrypted();
      if ((userInfo.fk_role = 2)) {
        this.Router.navigate(['admin/product']);
      } else {
        this.Router.navigate(['./dashboard_user']);
      }
    });
  }

  onChange(event: any) {
    this.file = event.target.files[0];

    this.product.image = '/assets/' + this.file.name;
  }

  async onUpload() {
    if (!this.file) {
      return;
    }
    const fd = new FormData();

    fd.append('file', this.file, this.file.name);
    this.productService.uploadImage(fd).subscribe((data) => {});
  }
}
