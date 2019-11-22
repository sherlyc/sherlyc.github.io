import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { CookieService } from './services/cookie/cookie.service';
import { WindowService } from './services/window/window.service';
import { RuntimeService } from './services/runtime/runtime.service';
import { DeviceService } from './services/device.service';
import { DeviceType } from '../../common/DeviceType';
import * as moment from 'moment';

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
    if (this.runtimeService.isServer()) {
      return true;
    }

    const siteViewCookieKey = 'site-view';
    const mobileCookie = 'i';
    const desktopCookie = 'd';

    const device = this.deviceService.getDevice();
    const siteViewCookie = this.cookieService.get(siteViewCookieKey);

    if (this.shouldRedirect(device, siteViewCookie)) {
      if (!siteViewCookie) {
        this.setSiteViewCookie(siteViewCookieKey, desktopCookie);
      }

      this.windowService.getWindow().location.href = 'https://www.stuff.co.nz';
      return false;
    }

    if (!siteViewCookie) {
      this.setSiteViewCookie(siteViewCookieKey, mobileCookie);
    }
    return true;
  }

  private setSiteViewCookie(key: string, value: string) {
    const expiryDate = moment();
    expiryDate.add(1, 'year');
    this.cookieService.set(key, value, {
      domain: '.stuff.co.nz',
      path: '/',
      expires: expiryDate.toDate()
    });
  }

  private shouldRedirect(device: DeviceType, siteViewCookie: string) {
    if (siteViewCookie === 'd') {
      return true;
    }
    return !siteViewCookie && device === DeviceType.desktop;
  }
}
