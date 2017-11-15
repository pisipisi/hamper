import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/index';

@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private authenticationService: AuthenticationService, private router: Router) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('accessToken')) {
            if(!localStorage.getItem('user')) {
                let username = localStorage.getItem('username');
                let password = localStorage.getItem('password');
                this.authenticationService.sendPostRequest('/api/customer/login', {username:username, password:password}).subscribe(
                    data => {
                      localStorage.setItem('user',JSON.stringify(data));
                    },
                    error => {}
                  )
            }
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
    allowTransition():boolean {
        if (localStorage.getItem('accessToken')) {
            return true;
        }
        return false;
    }
}