import { PublicModule } from './../public.module';
import { CategoryModule } from './../../container/category.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProductRoutingModule } from './view-product-routing.module';
import { VAllProductComponent } from './v-all-product/v-all-product.component';
import { VLayoutComponent } from './v-layout/v-layout.component';
import { VProductByCatComponent } from './v-product-by-cat/v-product-by-cat.component';
import { VDetailProductComponent } from './v-detail-product/v-detail-product.component';

@NgModule({
  declarations: [
    VAllProductComponent,
    VLayoutComponent,
    VProductByCatComponent,
    VDetailProductComponent,
  ],
  imports: [
    CommonModule,
    ViewProductRoutingModule,
    CategoryModule,
    PublicModule,
  ],
})
export class ViewProductModule {}
