import { UserRoleModel } from "../responses/userRolesResponse";


export interface UpdateUserRolesRequest {
  userId: string;
  userRoles: UserRoleModel[];
}
