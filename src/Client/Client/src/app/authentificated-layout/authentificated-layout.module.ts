import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificatedLayoutComponent } from './authentificated-layout.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterUserComponent } from './users-list/register-user/register-user.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { RolesComponent } from './roles/roles.component';
import { RolePermissionsComponent } from './role-permissions/role-permissions.component';

@NgModule({
  declarations: [
    AuthentificatedLayoutComponent,
    UsersListComponent,
    UserProfileComponent,
    RegisterUserComponent,
    UserRolesComponent,
    RolesComponent,
    RolePermissionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  
})
export class AuthentificatedLayoutModule { }
