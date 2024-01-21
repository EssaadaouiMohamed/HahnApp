import { Injectable } from '@angular/core';
import { LoginForm } from '../models/requests/loginForm';
import { firstValueFrom, BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpService } from './http-service-provider.service';
import { TokenResponse } from '../models/responses/tokenResponse';
import { UserClaims } from '../models/userClaims';
import { TResult } from '../models/wrappers';
import { RefreshTokenRequest } from '../models/requests/refreshTokenRequest';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private isAuth = new BehaviorSubject<boolean>(false);
  private userClaims!: UserClaims | null;
  constructor(private http: HttpService, private jwtHelperService: JwtHelperService) { }
  async login(credentials: LoginForm): Promise<boolean> {
    try {
      const response$ = this.http.post<TResult<TokenResponse>>('api/identity/token', credentials)
      const response = await firstValueFrom(response$);
      if (response && response.succeeded) {
        this.saveLoginData(response.data);
        let decodedJwt = await this.jwtHelperService.decodeToken(response.data.token);
        this.userClaims = this.fillUserClaimsFromDecodedToken(decodedJwt);
        this.isAuth.next(true);
      } else {
        console.log(response?.messages[0]);
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

  async isAuthenticated() {
    const token = localStorage.getItem('jwt_token');
    if (!token) {

      return this.isAuth.asObservable();
    }

    try {
      if (this.jwtHelperService.isTokenExpired(token)) {
        return this.isAuth.asObservable();
      }
      let decodedJwt = await this.jwtHelperService.decodeToken(token);
      this.userClaims = this.fillUserClaimsFromDecodedToken(decodedJwt);
      this.isAuth.next(true);
      return this.isAuth.asObservable();

    } catch (e) {
      console.error('Error decoding the token', e);
      return this.isAuth.asObservable();
    }
  }

  get isLoggedIn() {
    return this.isAuth.getValue();
  }

  get getUserClaims() {
    return this.userClaims;
  }

  async refreshToken(req: RefreshTokenRequest): Promise<TResult<TokenResponse>> {
    const response$ = this.http.post<TResult<TokenResponse>>(`api/identity/token/refresh`, req);
      const response = await firstValueFrom(response$);

      if (response.succeeded) {
        return response;
      } else {
        console.log(response.messages[0]);
        throw new Error(response.messages[0]);
      }
  }
  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_image_url');
    localStorage.removeItem('refresh_token_expiry');
    this.isAuth.next(false);
  }

  private fillUserClaimsFromDecodedToken(decodedJwt: any): UserClaims {
    return {
      nameidentifier: decodedJwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
      exp: decodedJwt.exp,
      role: decodedJwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
      emailaddress: decodedJwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      mobilephone: decodedJwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone'],
      name: decodedJwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      surname: decodedJwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'],
      permissions: decodedJwt.Permission // Assuming Permission contains an array of permissions
    };
  }
}