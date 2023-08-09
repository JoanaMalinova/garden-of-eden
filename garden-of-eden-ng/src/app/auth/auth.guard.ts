import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable, inject } from '@angular/core';
import { Location } from '@angular/common';


@Injectable({
    providedIn: 'root'
})

class PermissionsService {

    constructor(
        private authService: AuthService,
        private router: Router,
        private location: Location
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        // const currPath = this.location.path();

        if (this.authService.checkLogin()) {

            // if (currPath == "/login" || currPath == "/register") {
            //     this.router.navigate(['/home']);

            //     return false;
            // }

            return true;
        }
        // if (currPath == "/login" || currPath == "/register") {

        //     return true;
        // }

        this.router.navigate(['/login']);

        return false;
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermissionsService).canActivate(next, state);
}