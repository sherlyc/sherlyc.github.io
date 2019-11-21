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
    const siteViewCookieKey = 'site-view';
    const mobileCookie = 'i';
    const desktopCookie = 'd';

    const device = this.deviceService.getDevice();
    const siteViewCookie = this.cookieService.get(siteViewCookieKey);

    if (this.shouldRedirect(device, siteViewCookie)) {
      this.cookieService.set(siteViewCookieKey, desktopCookie);
      this.windowService.getWindow().location.href = 'https://www.stuff.co.nz';
      return false;
    }

    this.cookieService.set(siteViewCookieKey, mobileCookie);
    return true;
  }

  private shouldRedirect(device: DeviceType, siteViewCookie: string) {
    if (siteViewCookie === 'd') {
      return true;
    }

    if (!siteViewCookie && device !== DeviceType.mobile && device !== DeviceType.tablet) {
      return true;
    }

    return false;
  }
}
