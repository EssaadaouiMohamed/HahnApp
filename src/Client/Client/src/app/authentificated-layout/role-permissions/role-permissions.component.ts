import { Component, Input, OnInit } from '@angular/core';
import { PermissionResponse, RoleClaimResponse } from '../../models/responses/permissionResponse';
import { RoleService } from '../../services/role.service';
import { CustomSnackbarService } from '../../services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionRequest } from '../../models/requests/permissionRequest';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
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
  isLoading = true;

  constructor(
    private roleService: RoleService,
    private snackBar: CustomSnackbarService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  async ngOnInit(): Promise<void> {
    try {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
    });
    await this.getRolePermissionsAsync();
    } finally {
      this.isLoading = false;
    }
  }
  getCounts(groupKey: string): string {
    const selectedCount = this.groupedRoleClaims.get(groupKey)?.filter(c => c.selected).length || 0;
    const totalCount = this.groupedRoleClaims.get(groupKey)?.length || 0;
    return `${selectedCount}/${totalCount}`;
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
        this.description = `Manage ${this._model.roleName}'s Permissions`;
      }
    } else {
      result.messages.forEach(error => {
        this.snackBar.openSnackBar(error, 'error');
      });
      this.router.navigate(['/roles']);
    }
  }

  async saveAsync(): Promise<void> {
    let request: PermissionRequest = { 
      roleId: this.id,
      roleClaims: Array.from(this.groupedRoleClaims.values()).flat().map(response => {
      return {
        id: response.id,
        roleId: response.roleId,
        type: response.type,
        value: response.value,
        description: response.description || '', // Using || '' to handle undefined values
        group: response.group || '', // Same as above
        selected: response.selected
      }
    })
  }
    const result = await this.roleService.updateRolePermissions(request);

    if (result.succeeded) {
      this.snackBar.openSnackBar(result.messages[0], 'success');
      this.router.navigate(['/roles']);
    } else {
      result.messages.forEach((error: string) => {
        this.snackBar.openSnackBar(error, 'error');
      });
    }
  }
  
}
