import { VDetailProductComponent } from './v-detail-product/v-detail-product.component';
import { VProductByCatComponent } from './v-product-by-cat/v-product-by-cat.component';
import { VAllProductComponent } from './v-all-product/v-all-product.component';
import { VLayoutComponent } from './v-layout/v-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: VLayoutComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: VAllProductComponent },
      { path: ':id', component: VProductByCatComponent },
      {path: 'detail_product/:id', component: VDetailProductComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProductRoutingModule {}
