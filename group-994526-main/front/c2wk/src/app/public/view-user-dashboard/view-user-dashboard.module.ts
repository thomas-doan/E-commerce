import { FormsModule } from '@angular/forms';
import { ProductModule } from './../../admin/product/product.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewUserDashboardRoutingModule } from './view-user-dashboard-routing.module';
import { VDLayoutComponent } from './v-dlayout/v-dlayout.component';
import { VDIndexComponent } from './v-dindex/v-dindex.component';
import { VDAddComponent } from './v-dadd/v-dadd.component';
import { VDDeleteComponent } from './v-ddelete/v-ddelete.component';
import { VDEditComponent } from './v-dedit/v-dedit.component';

@NgModule({
  declarations: [
    VDLayoutComponent,
    VDIndexComponent,
    VDAddComponent,
    VDDeleteComponent,
    VDEditComponent,
  ],
  imports: [
    CommonModule,
    ViewUserDashboardRoutingModule,
    ProductModule,
    FormsModule,
  ],
})
export class ViewUserDashboardModule {}
