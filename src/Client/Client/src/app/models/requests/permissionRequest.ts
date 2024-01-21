export interface RoleClaimRequest {
  id: number;
  roleId: string;
  type: string;
  value: string;
  description: string;
  group: string;
  selected: boolean;
}
export interface PermissionRequest {
  roleId: string;
  roleClaims: RoleClaimRequest[];
}
