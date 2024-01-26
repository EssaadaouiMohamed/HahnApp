import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthentificatedLayoutComponent } from './authentificated-layout/authentificated-layout.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { UserProfileComponent } from './authentificated-layout/user-profile/user-profile.component';
import { UsersListComponent } from './authentificated-layout/users-list/users-list.component';
import { UserRolesComponent } from './authentificated-layout/user-roles/user-roles.component';
import { RolesComponent } from './authentificated-layout/roles/roles.component';
import { RolePermissionsComponent } from './authentificated-layout/role-permissions/role-permissions.component';

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
      { path: 'user-roles/:id', component: UserRolesComponent },
      { path: 'role-permissions/:id', component: RolePermissionsComponent },
      { path: 'users', component: UsersListComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'user-profile', component: UserProfileComponent }
  ]},
  { path: '**', redirectTo: '', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
