import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-authentificated-layout',
  templateUrl: './authentificated-layout.component.html',
  styleUrl: './authentificated-layout.component.css'
})
export class AuthentificatedLayoutComponent {
  constructor(private authService: AuthentificationService, private router: Router) { }

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
