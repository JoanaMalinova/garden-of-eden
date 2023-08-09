import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable, inject } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

class PermissionsService {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const currPath = next.url[0].path;
        console.log(currPath);
        const isAuthenticated = this.authService.checkLogin();
        console.log(isAuthenticated);

        //!!!!!!!!!za6to samo za login kogato si loggnat  isAuthenticated e greshno ????

        if (isAuthenticated) {

            if (currPath == "login" || currPath == "register") {
                this.router.navigate(['/home']);

                return false;
            }
            return true;
        }

        if (currPath == "login" || currPath == "register") {
            return true;
        }
        this.router.navigate(['/login']);

        return false;
    }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermissionsService).canActivate(next, state);
}

