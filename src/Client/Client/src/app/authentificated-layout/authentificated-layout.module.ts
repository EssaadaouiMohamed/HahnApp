import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificatedLayoutRoutingModule } from './authentificated-layout-routing.module';
import { AuthentificatedLayoutComponent } from './authentificated-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AuthentificatedLayoutComponent,
    DashboardComponent,
    UsersListComponent,
    UserProfileComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  
})
export class AuthentificatedLayoutModule { }
