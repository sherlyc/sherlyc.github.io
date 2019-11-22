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

    const shouldContinueToMobile = this.shouldContinueToMobile(device, siteViewCookie);
    if (shouldContinueToMobile) {
      if (!siteViewCookie) {
        this.setSiteViewCookie(siteViewCookieKey, mobileCookie);
      }
    } else {
      if (!siteViewCookie) {
        this.setSiteViewCookie(siteViewCookieKey, desktopCookie);
      }
      this.redirectToDesktop();
    }

    return shouldContinueToMobile;
  }

  private redirectToDesktop() {
    this.windowService.getWindow().location.href = 'https://www.stuff.co.nz';
  }

  private setSiteViewCookie(key: string, value: string) {
    const hostname = this.windowService.getWindow().location.hostname;
    const cookieDomain = hostname.includes('stuff.co.nz') ? '.stuff.co.nz' : hostname;
    const expiryDate = moment();
    expiryDate.add(1, 'year');
    this.cookieService.set(key, value, {
      domain: cookieDomain,
      path: '/',
      expires: expiryDate.toDate()
    });
  }

  private shouldContinueToMobile(device: DeviceType, siteViewCookie: string) {
    if (siteViewCookie === 'i') {
      return true;
    }
    return !siteViewCookie && device !== DeviceType.desktop;
  }
}
