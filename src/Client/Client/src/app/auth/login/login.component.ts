import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { LoginForm } from '../../models/loginForm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: LoginForm = { email: '', password: '' };

  constructor(private authService: AccountService, private router: Router) { }

  async onSubmit() {
    const response = await this.authService.login(this.loginForm);
    if (response) {
      this.router.navigate(['/dashboard']);
    }
  }
}
