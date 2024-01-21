import { Injectable } from '@angular/core';
import { firstValueFrom, BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http-service-provider.service';
import { AuthentificationService } from './authentification.service';
import { Result, TResult } from '../models/wrappers';
import { UpdateProfileRequest } from '../models/requests/updateProfileRequest';
import { UpdateProfilePictureRequest } from '../models/requests/profilePictureRequest';
import { ChangePasswordRequest } from '../models/requests/changePasswordRequest';


@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(private http: HttpService, private authentification: AuthentificationService) { }

  async updateProfile(req: UpdateProfileRequest): Promise<Result> {
    const userClaims = this.authentification.getUserClaims;
    if (userClaims?.nameidentifier) {
      const response$ = this.http.put<Result>(`api/identity/account/UpdateProfile`, req);
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

  async changePassword(req: ChangePasswordRequest): Promise<Result> {
    if (req) {
      const response$ = this.http.put<Result>(`api/identity/account/ChangePassword`, req);
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

  async getProfilePictureAsync(): Promise<TResult<string>> {
    const userClaims = this.authentification.getUserClaims;
    if (userClaims?.nameidentifier) {
      const response$ = this.http.get<TResult<string>>(`api/identity/user/${userClaims.nameidentifier}`);
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

  async updateProfilePictureAsync(req: UpdateProfilePictureRequest): Promise<TResult<string>> {
    const userClaims = this.authentification.getUserClaims;
    if (userClaims?.nameidentifier && req) {
      const response$ = this.http.post<TResult<string>>(`api/identity/user/${userClaims.nameidentifier}`, req);
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
