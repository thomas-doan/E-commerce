import { PublicModule } from './../public/public.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AuthlayoutComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    PublicModule,
    FontAwesomeModule,
  ],
})
export class AuthModule {}
