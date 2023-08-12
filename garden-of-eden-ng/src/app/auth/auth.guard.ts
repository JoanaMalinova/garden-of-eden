import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

class PermissionsService {

    constructor(
        private router: Router,
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const currPath = state.url;
        const currUser = localStorage.getItem("user");
        console.log(currUser);
        console.log(currPath);

        if (currUser) {

            if (currPath === "/login" || currPath === "/register") {
                this.router.navigate(['/home']);
                return false;
            }
            return true;
        }

        if (currPath === "/login" || currPath === "/register") {
            return true;
        }

        this.router.navigate(['/login']);
        return false;

    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermissionsService).canActivate(next, state);
}

