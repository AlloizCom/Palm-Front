import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot} from "@angular/router";
import {UserDetailsService} from "../service/user-details.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AdminChildrenGuards implements CanActivateChild{
  constructor(private _userDet: UserDetailsService){}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._userDet.checkAuth();
  }

}
