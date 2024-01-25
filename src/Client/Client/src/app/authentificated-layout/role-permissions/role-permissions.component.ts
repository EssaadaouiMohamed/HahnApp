import { Component, Input, OnInit } from '@angular/core';
import { PermissionResponse, RoleClaimResponse } from '../../models/responses/permissionResponse';
import { RoleService } from '../../services/role.service';
import { CustomSnackbarService } from '../../services/snack-bar.service';
import { Router } from '@angular/router';
import { PermissionRequest } from '../../models/requests/permissionRequest';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
@Component({
  selector: 'app-role-permissions',
  templateUrl: './role-permissions.component.html',
  styleUrl: './role-permissions.component.css'
})
export class RolePermissionsComponent implements OnInit {
  @Input() id!: string;
  @Input() title!: string;
  @Input() description!: string;

  private _model!: PermissionResponse;
  groupedRoleClaims: Map<string, RoleClaimResponse[]> = new Map();
  displayedColumns: string[] = ['type', 'value', 'description', 'status'];
  private _searchString = "";
  private _canEditRolePermissions!: boolean;
  private _canSearchRolePermissions!: boolean;
  private _loaded!: boolean;

  constructor(
    private roleService: RoleService,
    private snackBar: CustomSnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRolePermissionsAsync();
  }

  private async getRolePermissionsAsync(): Promise<void> {
    const roleId = this.id;
    const result = await this.roleService.getRolePermissions(roleId);

    if (result.succeeded) {
      this._model = result.data;
      this.groupedRoleClaims.set("All Permissions", this._model.roleClaims);
      this._model.roleClaims.forEach(claim => {
        if (this.groupedRoleClaims.has(claim.group!)) {
          this.groupedRoleClaims.get(claim.group!)?.push(claim);
        } else {
          this.groupedRoleClaims.set(claim.group!, [claim]);
        }
      });

      if (this._model) {
        this.description = "Manage {0} {1}'s Permissions", this._model.roleId, this._model.roleName;
      }
    } else {
      result.messages.forEach(error => {
        this.snackBar.openSnackBar(error, 'error');
      });
      this.router.navigate(['/identity/roles']);
    }
  }

  async saveAsync(): Promise<void> {
    const request: PermissionRequest = plainToClass(PermissionRequest, this._model, { excludeExtraneousValues: true });
    const result = await this.roleService.updateRolePermissions(request);

    if (result.succeeded) {
      this.snackBar.openSnackBar(result.messages[0], 'success');
      this.router.navigate(['/identity/roles']);
    } else {
      result.messages.forEach((error: string) => {
        this.snackBar.openSnackBar(error, 'error');
      });
    }
  }
  
}
