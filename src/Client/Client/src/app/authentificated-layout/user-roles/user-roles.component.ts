import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRoleModel } from '../../models/responses/userRolesResponse';
import { UpdateUserRolesRequest } from '../../models/requests/updateUserRolesRequest';
import { UserService } from '../../services/user-service.service';
import { CustomSnackbarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrl: './user-roles.component.css'
})
export class UserRolesComponent {

  userId!: string | null;
  userRolesList!: UserRoleModel[];
  displayedColumns: string[] = ['roleName', 'roleDescription', 'selected'];
  constructor(private route: ActivatedRoute, private userService: UserService, private snackBar: CustomSnackbarService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });
  }

  async saveAsync(): Promise<void> {
    const request: UpdateUserRolesRequest = {
      userId: this.userId!,
      userRoles : this.userRolesList
    }
    const response = await this.userService.updateUserRoles(request);
    if (response && response.succeeded) {
      this.snackBar.openSnackBar(response.messages[0], 'success');
    } else if (response) {
      this.snackBar.openSnackBar(response.messages[0], 'error');
    }
  }
}
