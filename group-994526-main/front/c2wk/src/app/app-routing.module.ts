import { AuthGuard } from './_helpers/auth.guard';
import { ErrorComponent } from './_utils/error/error.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'category',
    loadChildren: () =>
      import('./container/category.module').then((m) => m.CategoryModule),
  },

  /*   {
    path: 'products',
    loadChildren: () =>
      import('./public/view-product/view-product.module').then(
        (m) => m.ViewProductModule
      ),
  }, */

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
