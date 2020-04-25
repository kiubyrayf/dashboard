import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public authService: AuthService,
    public router: Router) { }
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Guard for user is login or not
    const user = JSON.parse(localStorage.getItem('_user_data'));
    if (!user) { //!usser
      this.router.navigate(['/auth/login']);
      return true;
    }
    return true;
  }
}
