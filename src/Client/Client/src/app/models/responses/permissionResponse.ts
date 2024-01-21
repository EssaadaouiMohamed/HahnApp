export interface RoleClaimResponse {
  id: number;
  roleId: string;
  type: string;
  value: string;
  description?: string;
  group?: string;
  selected: boolean;
}
export interface PermissionResponse {
  roleId: string;
  roleName: string;
  roleClaims: RoleClaimResponse[];
}
