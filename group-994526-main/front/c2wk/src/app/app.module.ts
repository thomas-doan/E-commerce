import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './_utils/error/error.component';
import { TokenInterceptorProvider } from './_helpers/token.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FontAwesomeModule],

  providers: [TokenInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
