import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private authService: AuthentificationService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}

