import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthentificationService } from './services/authentification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isAuth!: Observable<boolean>;

  constructor(private http: HttpClient, private authService: AuthentificationService, private router: Router) { }

  async ngOnInit() {
    this.isAuth = await this.authService.isAuthenticated();
  }
}
