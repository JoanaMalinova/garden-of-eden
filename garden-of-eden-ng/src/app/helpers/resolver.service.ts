import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ResolverService {
  constructor(private authService: AuthService) { }

  getAuthState(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.authService.checkLogin();
  }
}

const authOnStateChangeResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(ResolverService).getAuthState(route, state);
};



