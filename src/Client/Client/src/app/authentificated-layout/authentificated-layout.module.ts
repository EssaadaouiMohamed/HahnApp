import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthentificatedLayoutRoutingModule } from './authentificated-layout-routing.module';
import { AuthentificatedLayoutComponent } from './authentificated-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthentificatedLayoutComponent,
    DashboardComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule, MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    AuthentificatedLayoutRoutingModule
  ]
})
export class AuthentificatedLayoutModule { }
