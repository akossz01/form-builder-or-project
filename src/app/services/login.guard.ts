import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardLogin implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(): boolean {
      if (!this.authService.isAuthenticated()) {
        return true;
      } else {
        // If user is not logged in, redirect to login page
        this.router.navigate(['']);
        return false;
      }
    }
  }