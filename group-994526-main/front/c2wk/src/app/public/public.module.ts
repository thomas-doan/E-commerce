import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryModule } from './../container/category.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

import { ContactComponent } from './contact/contact.component';
import { PublicRoutingModule } from './public-routing.module';
import { PlayoutComponent } from './playout/playout.component';
import { PheaderComponent } from './pheader/pheader.component';
import { ProfilComponent } from './profil/profil.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent,
    PlayoutComponent,
    PheaderComponent,
    ProfilComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    CategoryModule,
    FontAwesomeModule,
  ],
  exports: [PheaderComponent],
})
export class PublicModule {}
