import { ICategory } from './../../_interfaces/category';
import { CategoryService } from './../../_services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-cat',
  templateUrl: './list-cat.component.html',
  styleUrls: ['./list-cat.component.scss'],
})
export class ListCatComponent implements OnInit {
  categoryList: ICategory[] = [];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((resAllCategories) => {
      this.categoryList = resAllCategories;
    });
  }
}
