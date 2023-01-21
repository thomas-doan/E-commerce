import { PDeleteComponent } from './p-delete/p-delete.component';
import { PAddComponent } from './p-add/p-add.component';
import { PEditComponent } from './p-edit/p-edit.component';
import { PIndexComponent } from './p-index/p-index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: PIndexComponent },
  { path: 'edit/:id', component: PEditComponent },
  { path: 'add', component: PAddComponent },
  { path: 'delete/:id', component: PDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
