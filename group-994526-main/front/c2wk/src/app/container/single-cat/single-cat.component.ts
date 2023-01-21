import { Router } from '@angular/router';
import { ICategory } from './../../_interfaces/category';
import { IProduct } from 'src/app/_interfaces/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-cat',
  templateUrl: './single-cat.component.html',
  styleUrls: ['./single-cat.component.scss'],
})
export class SingleCatComponent implements OnInit {
  @Input() item: ICategory = {
    id: 0,
    category: '',
    image: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
  };
  constructor(private Router: Router) {}

  ngOnInit(): void {}

  redirectionToViewProductCat(id: any): void {
    this.Router.navigate(['products/category', id]);
  }
}
