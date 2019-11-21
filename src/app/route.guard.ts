import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from './services/cookie/cookie.service';
import { WindowService } from './services/window/window.service';
import { RuntimeService } from './services/runtime/runtime.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private windowService: WindowService,
    private runtimeService: RuntimeService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return false;
  }
}
