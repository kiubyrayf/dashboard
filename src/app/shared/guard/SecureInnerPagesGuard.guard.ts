import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/login/auth.service';

@Injectable({
    providedIn: 'root'
})

export class SecureInnerPagesGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const user = JSON.parse(localStorage.getItem('_user_data'));
        if (this.authService.isLoggedIn) {
            window.alert('¡No tienes permiso para acceder a esta URL!');
            this.router.navigate(['/auth/login']);
        }
        return true;
    }
}
