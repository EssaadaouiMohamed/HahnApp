import { Injectable } from '@angular/core';
import { HttpService } from './http-service-provider.service';
import { AccountService } from './account.service';
import { UserResponse } from '../models/userResponse';
import { IResult } from '../models/wrappers';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpService, private accountService: AccountService) { }

    getById(): UserResponse | null {
        const userClaims = this.accountService.getUserClaims;
        if (userClaims?.nameidentifier) {
            this.http.get<IResult<UserResponse>>(`api/identity/user/${userClaims.nameidentifier}`)
                .subscribe({
                    next: (response) => {
                        if (response?.succeeded) {
                            return response.data;
                        } else {
                            console.log(response?.messages[0]);
                        }
                    },
                    error: (error) => {
                        console.error('Failed to get user data', error);
                    }
                });
        }
    }
}
