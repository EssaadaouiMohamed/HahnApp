import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from '../app/services/account.service'
import { Observable } from 'rxjs';
import { RouterModule, Routes, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isAuth!: Observable<boolean>;
  
  constructor(private http: HttpClient, private accountService: AccountService, private router: Router) { }

  async ngOnInit() {
    this.isAuth = await this.accountService.isAuthenticated();
  }
}
