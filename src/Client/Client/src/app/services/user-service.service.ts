import { Injectable } from '@angular/core';
import { HttpService } from './http-service-provider.service';
import { AccountService } from './account.service';
import { UserResponse } from '../models/responses/userResponse';
import { Result, TResult } from '../models/wrappers';
import { firstValueFrom } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { RegisterUserRequest } from '../models/requests/registerUserRequest';
import { UpdateUserRolesRequest } from '../models/requests/updateUserRolesRequest';
import { ResetPasswordRequest } from '../models/requests/resetPasswordRequest';
import { UserRolesResponse } from '../models/responses/userRolesResponse';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService, private authService: AuthentificationService) { }

  async getById(): Promise<TResult<UserResponse>> {
    const userClaims = this.authService.getUserClaims;
    if (userClaims?.nameidentifier) {
      const response$ = this.http.get<TResult<UserResponse>>(`api/identity/user/${userClaims.nameidentifier}`);
      const response = await firstValueFrom(response$);

      if (response.succeeded) {
        return response;
      } else {
        console.log(response.messages[0]);
        throw new Error(response.messages[0]);
      }
    } else {
      throw new Error('User claims not found');
    }
  }

  async getAll(): Promise<TResult<Array<UserResponse>>> {
    const userClaims = this.authService.getUserClaims;
    if (userClaims?.nameidentifier) {
      const response$ = this.http.get<TResult<Array<UserResponse>>>(`api/identity/user`);
      const response = await firstValueFrom(response$);

      if (response.succeeded) {
        return response;
      } else {
        console.log(response.messages[0]);
        throw new Error(response.messages[0]);
      }
    } else {
      throw new Error('User claims not found');
    }
  }

  async registerUser(req: RegisterUserRequest): Promise<Result> {
    const userClaims = this.authService.getUserClaims;
    if (userClaims?.nameidentifier) {
      const response$ = this.http.post<Result>(`api/identity/user`, req);
      const response = await firstValueFrom(response$);

      if (response.succeeded) {
        return response;
      } else {
        console.log(response.messages[0]);
        throw new Error(response.messages[0]);
      }
    } else {
      throw new Error('User claims not found');
    }
  }

  async getUserRoles(): Promise<TResult<UserRolesResponse>> {
    const userClaims = this.authService.getUserClaims;
    if (userClaims?.nameidentifier) {
      const response$ = this.http.get<TResult<UserRolesResponse>>(`api/identity/user/roles/${userClaims.nameidentifier}`);
      const response = await firstValueFrom(response$);

      if (response.succeeded) {
        return response;
      } else {
        console.log(response.messages[0]);
        throw new Error(response.messages[0]);
      }
    } else {
      throw new Error('User claims not found');
    }
  }

  async updateUserRoles(req: UpdateUserRolesRequest): Promise<Result> {
    const userClaims = this.authService.getUserClaims;
    if (userClaims?.nameidentifier) {
      const response$ = this.http.put<Result>(`api/identity/user/roles/${userClaims.nameidentifier}`, req);
      const response = await firstValueFrom(response$);

      if (response.succeeded) {
        return response;
      } else {
        console.log(response.messages[0]);
        throw new Error(response.messages[0]);
      }
    } else {
      throw new Error('User claims not found');
    }
  }

  async forgotPassword(req: string): Promise<Result> {
    const userClaims = this.authService.getUserClaims;
    if (userClaims?.nameidentifier) {
      const response$ = this.http.post<Result>(`api/identity/user/forgot-password`, req);
      const response = await firstValueFrom(response$);

      if (response.succeeded) {
        return response;
      } else {
        console.log(response.messages[0]);
        throw new Error(response.messages[0]);
      }
    } else {
      throw new Error('User claims not found');
    }
  }

  async resetPassword(req: ResetPasswordRequest): Promise<Result> {
    const userClaims = this.authService.getUserClaims;
    if (userClaims?.nameidentifier) {
      const response$ = this.http.post<Result>(`api/identity/user/reset-password`, req);
      const response = await firstValueFrom(response$);

      if (response.succeeded) {
        return response;
      } else {
        console.log(response.messages[0]);
        throw new Error(response.messages[0]);
      }
    } else {
      throw new Error('User claims not found');
    }
  }
}
