import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable, inject } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';


@Injectable({
    providedIn: 'root'
})

class PermissionsService {

    isAuthenticated: boolean = false;
    auth = getAuth();
    currUrl: string = "";

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        this.currUrl = state.url;

        onAuthStateChanged(this.auth, ((user) => {

            if (user) {
                this.isAuthenticated = true;
                if (this.currUrl === "/login" || this.currUrl === "/register") {
                    this.router.navigate(['/home']);
                }
            } else {
                this.isAuthenticated = false;
                if (this.currUrl !== "/login" && this.currUrl !== "/register") {
                    this.router.navigate(['/login']);
                }
            }
        }));

        if (this.isAuthenticated) {
            if (this.currUrl === "/login" || this.currUrl === "/register") {
                return false;
            }
            return true;
        }

        if (this.currUrl === "/login" || this.currUrl === "/register") {
            return true;
        }
        return false;
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermissionsService).canActivate(next, state);
}

