import { Component, Input, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { RoleService } from '../../services/role.service';
import { RoleResponse } from '../../models/responses/roleResponse';
import { CustomSnackbarService } from '../../services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../../shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';
import { RoleRequest } from '../../models/requests/roleRequest';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  @Input() roles: RoleResponse[] = [];
  displayedColumns: string[] = ['name', 'description', 'actions'];
  constructor(
    private authService: AuthentificationService,
    private roleService: RoleService,
    private snackBar: CustomSnackbarService,
    private dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    const permissions = this.authService.getUserClaims?.permissions;
    await this.getRoles();
  }

  async getRoles(): Promise<void> {
    const response = await this.roleService.getAll()
    if (response && response.succeeded) {
      this.roles = response.data;
    } else {
      this.snackBar.openSnackBar(response.messages[0], 'error');
    }
  }

  managePermissions(id: string): void { /* ... */ }

  async addEditRole(id: string = ''): Promise<void> {
    let role!: RoleRequest;
    if (id != '') {
      let r = this.roles.find(x => x.id == id);
      role.id = r?.id;
      role.name = r?.name!;
      role.description = r?.description;
    }
    const dialogRef = this.dialog.open(RoleDialogComponent, {
      width: '500px',
      data: role
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const response = await this.roleService.saveRole(result);
        if (response && response.succeeded) {
          this.snackBar.openSnackBar(response.messages[0], 'success')
        } else if (response) {
          this.snackBar.openSnackBar(response.messages[0], 'error')
        }
      }
    });
}

  async deleteRole(id: string): Promise<void> {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const response = await this.roleService.deleteRole(id);
        if (response && response.succeeded) {
          await this.getRoles();
          this.snackBar.openSnackBar(response.messages[0], 'success')
        } else if (response) {
          this.snackBar.openSnackBar(response.messages[0], 'error')
        }

      } else {
        console.log('Cancelled deletion');
      }
    });
  }

}
