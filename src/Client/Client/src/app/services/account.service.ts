import { Injectable } from '@angular/core';
import { LoginForm } from '../models/loginForm';
import { firstValueFrom, BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpService } from './http-service-provider.service';
import { TokenResponse } from '../models/tokenResponse';
import { HttpResponse } from '@angular/common/http';
import { ApiResponse } from '../models/apiResponse';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private isAuth = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpService, private jwtHelperService: JwtHelperService) { }

  async login(credentials: LoginForm): Promise<boolean> {
    try {
      const response = await this.http.post<ApiResponse<TokenResponse>>('api/identity/token', credentials).toPromise();

      if (response && response.succeeded) {
        this.saveLoginData(response.data);
        this.isAuth.next(true);
      } else {
        console.log("blabla");
      }

      return this.isLoggedIn;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  saveLoginData(response: TokenResponse) {
    localStorage.setItem('jwt_token', response.token);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('user_image_url', response.userImageUrl);
    localStorage.setItem('refresh_token_expiry', response.refreshTokenExpiryTime);
  }

   get isAuthenticated() {
    const token = localStorage.getItem('jwt_token');
     if (!token) {
       
       return this.isAuth.asObservable();
     }

     try {
       if (this.jwtHelperService.isTokenExpired(token)) {
         return this.isAuth.asObservable();
      }
       this.isAuth.next(true);
       return this.isAuth.asObservable();

    } catch (e) {
      console.error('Error decoding the token', e);
       return this.isAuth.asObservable();
    }
  }

  // Method to check current value of isAuth without subscribing
  get isLoggedIn() {
    return this.isAuth.getValue();
  }
  refreshToken() {
  }

  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_image_url');
    localStorage.removeItem('refresh_token_expiry');
    this.isAuth.next(false);
  }
}
