import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Router } from '@angular/router';
import { PIndexComponent } from '../p-index/p-index.component';

@Component({
  selector: 'app-p-delete',
  templateUrl: './p-delete.component.html',
  styleUrls: ['./p-delete.component.scss'],
})
export class PDeleteComponent implements OnInit {
  private product_id: number = 0;
  constructor(
    private activated: ActivatedRoute,
    private productService: ProductService,
    private Router: Router
  ) {}

  ngOnInit(): void {
    this.product_id = +(this.activated.snapshot.paramMap.get('id') ?? 0);
    this.activated.params.subscribe((data) => {});
  }

  // delete() {
  // console.log(this.product_id)
  // this.productService.deleteProduct(this.product_id).subscribe(
  // data => {
  // console.log(`delete = ${data}`)
  // this.Router.navigate(['admin/product']);
  // new PIndexComponent(this.productService);
  // })
  // }
}
