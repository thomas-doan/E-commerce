import { UDeleteComponent } from './u-delete/u-delete.component';
import { UAddComponent } from './u-add/u-add.component';
import { UIndexComponent } from './u-index/u-index.component';
import { UEditComponent } from './u-edit/u-edit.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UIndexComponent },
  { path: 'edit/:id', component: UEditComponent },
  { path: 'add', component: UAddComponent },
  { path: 'delete', component: UDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
