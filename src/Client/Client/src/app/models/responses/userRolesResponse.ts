export interface UserRoleModel {
  roleName: string;
  roleDescription: string;
  selected: boolean;
}

export interface UserRolesResponse {
  userRoles: UserRoleModel[];
}
