import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { CategoryRoutingModule } from './category-routing.module';
import { ClayoutComponent } from './clayout/clayout.component';
import { PublicModule } from '../public/public.module';
import { SingleCatComponent } from './single-cat/single-cat.component';
import { ListCatComponent } from './list-cat/list-cat.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { ListProdByCatComponent } from './list-prod-by-cat/list-prod-by-cat.component';
import { DetailProductComponent } from './detail-product/detail-product.component';

@NgModule({
  declarations: [
    ClayoutComponent,
    SingleCatComponent,
    ListCatComponent,
    ListProductComponent,
    SingleProductComponent,
    ListProdByCatComponent,
    DetailProductComponent,
  ],
  imports: [CommonModule, CategoryRoutingModule],
  exports: [ListCatComponent, ListProductComponent, ListProdByCatComponent, DetailProductComponent],
})
export class CategoryModule {}
