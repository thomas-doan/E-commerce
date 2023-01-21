import { AuthClientConnectGuard } from './../_helpers/auth-client-connect.guard';
import { ProfilComponent } from './profil/profil.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { PlayoutComponent } from './playout/playout.component';
const routes: Routes = [
  {
    path: '',
    component: PlayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },

      { path: 'contact', component: ContactComponent },
      {
        path: 'products',
        loadChildren: () =>
          import('./view-product/view-product.module').then(
            (m) => m.ViewProductModule
          ),
      },

      {
        path: 'dashboard_user',
        loadChildren: () =>
          import('./view-user-dashboard/view-user-dashboard.module').then(
            (m) => m.ViewUserDashboardModule
          ),
        /*       canActivate: [AuthClientConnectGuard], */
      },
      {
        path: 'profil',
        component: ProfilComponent,
        canActivate: [AuthClientConnectGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
