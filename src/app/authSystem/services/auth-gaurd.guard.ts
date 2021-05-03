import { AuthSystemsService } from './auth-systems.service';
import { TokenModel } from './../../models/toekn.iterface';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGaurdGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthSystemsService
  ) {}
  token: any;
  expDate: any;
  today: any = Date.now();
  validToken: boolean = false;

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.token = localStorage.getItem('userToken');
    if (this.token) {
      let currentDay = new Date(this.today);
      let tokenInfo: TokenModel = this.getDecodedAccessToken(this.token); // decode token
      this.authService.TokenObject = tokenInfo;
      let expireDate = tokenInfo.exp; // get token expiration dateTime
      this.expDate = new Date(expireDate * 1000);

      if (currentDay < this.expDate) {
        this.validToken = true;
        return true;
      } else {
        this.validToken = false;
        localStorage.clear();
        this.router.navigate(['/Login']);
        return false;
      }
    } else {
      this.validToken = false;
      this.router.navigate(['/Login']);
      return false;
    }
  }
}
