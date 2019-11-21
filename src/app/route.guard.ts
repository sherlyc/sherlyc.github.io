import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from './services/cookie/cookie.service';
import { WindowService } from './services/window/window.service';
import { RuntimeService } from './services/runtime/runtime.service';
import { DeviceService } from './services/device.service';
import { DeviceType } from '../../common/DeviceType';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private windowService: WindowService,
    private runtimeService: RuntimeService,
    private deviceService: DeviceService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const device = this.deviceService.getDevice();
    const siteViewCookieKey = 'site-view';
    const siteViewCookie = this.cookieService.get(siteViewCookieKey);
    const mobileCookie = 'i';
    const desktopCookie = 'd';

    if (siteViewCookie === mobileCookie) {
      return true;
    } else if (siteViewCookie === desktopCookie) {
      return false;
    }

    if (device === DeviceType.mobile) {
      this.cookieService.set(siteViewCookieKey, mobileCookie);
      return true;
    }

    this.cookieService.set(siteViewCookieKey, desktopCookie);
    this.windowService.getWindow().location.href = 'https://www.stuff.co.nz';
    return false;
  }
}
