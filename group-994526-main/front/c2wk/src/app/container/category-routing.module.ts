import { DetailProductComponent } from './detail-product/detail-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ListProdByCatComponent } from './list-prod-by-cat/list-prod-by-cat.component';
import { ListCatComponent } from './list-cat/list-cat.component';
import { ClayoutComponent } from './clayout/clayout.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ClayoutComponent,
    children: [
      { path: '', component: ListProductComponent },
      { path: 'category/:id', component: ListProdByCatComponent },
      { path: 'detail_product/:id', component: DetailProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
