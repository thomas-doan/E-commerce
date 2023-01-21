import { IProduct } from 'src/app/_interfaces/product';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
})
export class SingleProductComponent implements OnInit {
  @Input() productItem: IProduct = {
    id_product: 0,
    name: '',
    price: 0,
    description: '',
    image: '',
    CategoryId: 0,
    UserIdUser: 0,
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
  };

  constructor(private Router: Router) {}

  ngOnInit(): void {}


  redirectionToDetailProduct(id: any): void {
    this.Router.navigate(['products/detail_product', id]);
  }

}
