import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (private auth: AuthServiceService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      console.warn('running'+"=========="+this.auth.isLoggedIn())

      if (!this.auth.isLoggedIn()) {
        this.router.navigate([''])
        return false;
      }

    return this.auth.isLoggedIn();
  }
  
}
