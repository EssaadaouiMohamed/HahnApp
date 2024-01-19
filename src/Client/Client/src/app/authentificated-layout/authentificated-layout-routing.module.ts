import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthentificatedLayoutComponent } from './authentificated-layout.component';

const routes: Routes = [
  {
    path: '', component: AuthentificatedLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, },
      { path: 'users', component: UsersListComponent, },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificatedLayoutRoutingModule { }
