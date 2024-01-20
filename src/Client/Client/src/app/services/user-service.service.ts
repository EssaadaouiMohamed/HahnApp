import { Injectable } from '@angular/core';
import { HttpService } from './http-service-provider.service';
import { AccountService } from './account.service';
import { UserResponse } from '../models/userResponse';
import { IResult } from '../models/wrappers';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService, private accountService: AccountService) { }

  async getById(): Promise<UserResponse> {
    const userClaims = this.accountService.getUserClaims;
    if (userClaims?.nameidentifier) {
      const response$ = this.http.get<IResult<UserResponse>>(`api/identity/user/${userClaims.nameidentifier}`);
      const response = await firstValueFrom(response$);

      if (response.succeeded) {
        return response.data;
      } else {
        console.log(response.messages[0]);
        throw new Error(response.messages[0]);
      }
    } else {
      throw new Error('User claims not found');
    }
  }

  getProfilePicture(): string {
    const userClaims = this.accountService.getUserClaims;
    let profilePictureData!: string;
    if (userClaims?.nameidentifier) {
      this.http.get<IResult<string>>(`/api/identity/account/profile-picture/${userClaims.nameidentifier}`)
        .subscribe({
          next: (response) => {
            if (response?.succeeded) {
              profilePictureData = response.data;
            } else {
              console.log(response?.messages[0]);
            }
          },
          error: (error) => {
            console.error('Failed to get user data', error);
          }
        }
        );
    }
    return profilePictureData;
  }
}
