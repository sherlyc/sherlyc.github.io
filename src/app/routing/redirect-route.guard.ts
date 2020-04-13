import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from "@angular/router";
import { addYears } from "date-fns";
import { DeviceType } from "../../../common/DeviceType";
import { ConfigService } from "../services/config/config.service";
import { CookieService } from "../services/cookie/cookie.service";
import { DeviceService } from "../services/device/device.service";
import { RuntimeService } from "../services/runtime/runtime.service";
import { WindowService } from "../services/window/window.service";

@Injectable({
  providedIn: "root"
})
export class RedirectRouteGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private windowService: WindowService,
    private runtimeService: RuntimeService,
    private deviceService: DeviceService,
    private configService: ConfigService
  ) {}

  isStuffDomain() {
    const { hostname } = this.windowService.getWindow().location;
    return hostname.includes("stuff.co.nz");
  }

  isDesktopDomain() {
    const { hostname } = this.windowService.getWindow().location;
    return hostname.includes("www");
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      this.runtimeService.isServer() ||
      this.isDesktopDomain() ||
      !this.isStuffDomain()
    ) {
      return true;
    }

    const siteViewCookieKey = "site-view";
    const mobileCookie = "i";
    const desktopCookie = "d";

    const device = this.deviceService.getDevice();
    const siteViewCookie = this.cookieService.get(siteViewCookieKey);

    const shouldContinueToMobile = this.shouldContinueToMobile(
      device,
      siteViewCookie
    );
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
    this.windowService.getWindow().location.href = this.configService.getConfig().redirectUrl;
  }

  private setSiteViewCookie(key: string, value: string) {
    const hostname = this.windowService.getWindow().location.hostname;
    const cookieDomain = hostname.includes("stuff.co.nz")
      ? ".stuff.co.nz"
      : hostname;
    const expires = addYears(new Date(), 1);

    this.cookieService.set(key, value, {
      domain: cookieDomain,
      path: "/",
      expires
    });
  }

  private shouldContinueToMobile(device: DeviceType, siteViewCookie: string) {
    if (siteViewCookie === "i") {
      return true;
    }
    return !siteViewCookie && device !== DeviceType.desktop;
  }
}
