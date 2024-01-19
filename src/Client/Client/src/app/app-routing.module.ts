import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthentificatedLayoutComponent } from './authentificated-layout/authentificated-layout.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './authentificated-layout/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'auth', component: AuthComponent,
    children:
      [
        { path: 'login', component: LoginComponent }
      ]
  },
  {
    path: '', component: AuthentificatedLayoutComponent, canActivate: [AuthGuardService],
  children:
  [
    { path: 'dashboard', component: DashboardComponent }
  ]},
  { path: '**', redirectTo: '', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
