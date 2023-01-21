import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AdminRoutingModule } from './admin-routing.module';
import { AlayoutComponent } from './alayout/alayout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { AheaderComponent } from './aheader/aheader.component';

@NgModule({
  declarations: [
    AlayoutComponent,
    DashboardComponent,
    SidemenuComponent,
    AheaderComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FontAwesomeModule],
})
export class AdminModule {}
