import { TokenService } from 'src/app/_services/token.service';

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthClientConnectGuard implements CanActivate {
  constructor(private router: Router, private TokenService: TokenService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    {
      if (this.TokenService.isConnected()) {
        return true;
      }
      return this.router.navigate(['/auth/login']);
    }
  }
}
