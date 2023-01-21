import { VDAddComponent } from './v-dadd/v-dadd.component';
import { VDEditComponent } from './v-dedit/v-dedit.component';
import { VDIndexComponent } from './v-dindex/v-dindex.component';
import { VDLayoutComponent } from './v-dlayout/v-dlayout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: VDLayoutComponent,
    children: [
      { path: '', component: VDIndexComponent },
      { path: 'edit/:id', component: VDEditComponent },
      { path: 'add', component: VDAddComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewUserDashboardRoutingModule {}
