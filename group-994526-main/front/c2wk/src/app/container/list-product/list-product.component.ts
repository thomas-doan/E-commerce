import { IProduct } from 'src/app/_interfaces/product';
import { ProductService } from './../../_services/product.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  productList: IProduct[] = [];
  constructor(private productService: ProductService) {
    this.productService.getAllProducts().subscribe((resAllProducts) => {
      this.productList = resAllProducts;
    });
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((resAllProducts) => {
      this.productList = resAllProducts;
    });
  }
}
