import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthentificatedLayoutModule } from './authentificated-layout/authentificated-layout.module';
import { AuthModule } from './auth/auth.module';
import { HttpService } from './services/http-service-provider.service';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
const routes: Routes = [

];
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AuthentificatedLayoutModule,
    AuthModule,
    SharedModule,
    BrowserAnimationsModule
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
