import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthentificatedLayoutModule } from './authentificated-layout/authentificated-layout.module';
import { AuthentificatedLayoutComponent } from './authentificated-layout/authentificated-layout.component';
import { AuthModule } from './auth/auth.module';
import { HttpService } from './services/http-service-provider.service';
import { UserProfileComponent } from './authentificated-layout/user-profile/user-profile.component';
import { SharedModule } from './shared/shared.module';
import { RegisterUserComponentComponent } from './authentificted-layout/user-list/register-user-component/register-user-component.component';
const routes: Routes = [
  // Define routes
];
@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponentComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AuthentificatedLayoutModule,
    AuthModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpService,
    multi: true
  },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },

    JwtHelperService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
