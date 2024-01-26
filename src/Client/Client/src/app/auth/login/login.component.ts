import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';
import { LoginForm } from '../../models/requests/loginForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: LoginForm = { email: '', password: '' };

  constructor(private authService: AuthentificationService, private router: Router) { }
  ngOnInit(): void {
    this.authService.logout();
    }

  async onSubmit() {
    const response = await this.authService.login(this.loginForm);
    if (response) {
      this.router.navigate(['/dashboard']);
    }
  }
}
