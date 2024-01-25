export class RoleClaimRequest {
  id: number = 0;
  roleId: string ='';
  type: string = '';
  value: string = '';
  description: string = '';
  group: string ='';
  selected: boolean = false;
}

export class PermissionRequest {
  roleId: string = '';
  roleClaims!: RoleClaimRequest[] ;
}
