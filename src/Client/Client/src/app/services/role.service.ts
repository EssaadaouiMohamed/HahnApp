import { Injectable } from '@angular/core';
import { HttpService } from './http-service-provider.service';
import { RoleResponse } from '../models/responses/roleResponse';
import { TResult } from '../models/wrappers';
import { firstValueFrom } from 'rxjs';
import { PermissionResponse } from '../models/responses/permissionResponse';
import { PermissionRequest } from '../models/requests/permissionRequest';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpService) { }

  async getAll(): Promise<TResult<Array<RoleResponse>>> {
    
    const response$ = this.http.get<TResult<Array<RoleResponse>>>(`api/identity/role`);
      const response = await firstValueFrom(response$);
      
        return response;
  }

  async saveRole(req: RoleResponse): Promise<TResult<Array<RoleResponse>>> {

    const response$ = this.http.post<TResult<Array<RoleResponse>>>(`api/identity/role`, req);
    const response = await firstValueFrom(response$);
    
      return response;
  }
  
  async deleteRole(roleId: string): Promise<TResult<string>> {

    const response$ = this.http.delete<TResult<string>>(`api/identity/role/${roleId}`);
    const response = await firstValueFrom(response$);
    
      return response; 
    
  }

  async getRolePermissions(roleId: string): Promise<TResult<PermissionResponse>> {

    const response$ = this.http.get<TResult<PermissionResponse>>(`api/identity/role/permissions/${roleId}`);
    const response = await firstValueFrom(response$);
    
      return response;
  }
  async updateRolePermissions(req: PermissionRequest): Promise<TResult<string>> {

    const response$ = this.http.put<TResult<string>>(`api/identity/role/permissions/update`, req);
    const response = await firstValueFrom(response$);
      return response;
  }
}
