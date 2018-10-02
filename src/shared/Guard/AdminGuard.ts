import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserDetailsService} from '../service/user-details.service';

@Injectable()
export class AdminGuard implements CanActivate{
  constructor(private router: Router, private _userDet: UserDetailsService){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this._userDet.checkAuth()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

}
