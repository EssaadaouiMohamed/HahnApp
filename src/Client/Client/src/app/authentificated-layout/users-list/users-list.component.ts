import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../models/responses/userResponse';
import { UserService } from '../../services/user-service.service';
import { CustomSnackbarService } from '../../services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterUserComponent } from './register-user/register-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'email', 'isActive', 'emailConfirmed', 'actions'];
  dataSource: UserResponse[] = [];
  isLoading: boolean = true;
  constructor(private userService: UserService, private snackBar: CustomSnackbarService, private dialog: MatDialog, private router: Router) { }
  async ngOnInit(): Promise<void> {
    await this.loadData();
      this.isLoading = false;
    }

  async loadData() {
    var response$ = await this.userService.getAll();
    if (response$.succeeded) {
      this.dataSource = response$.data;
    } else
      this.snackBar.openSnackBar(response$.messages[0], 'error');
  }

  openRegisterUserPopup(): void {
    this.dialog.open(RegisterUserComponent, {
      width: 'max-content',
      height: '80vh'
    });
  }

  manageRoles(id: string) {
    this.router.navigate(['/user-roles', id]);
  }
}
