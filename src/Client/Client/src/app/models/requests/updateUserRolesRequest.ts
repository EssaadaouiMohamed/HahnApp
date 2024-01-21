import { UserRoleModel } from "../responses/UserRolesResponse";

export interface UpdateUserRolesRequest {
  userId: string;
  userRoles: UserRoleModel[];
}
