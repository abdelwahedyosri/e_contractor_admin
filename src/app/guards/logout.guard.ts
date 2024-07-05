// src/app/guards/logout.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to login page after logout
    return false; // Prevent navigation to the actual logout route
  }
}
