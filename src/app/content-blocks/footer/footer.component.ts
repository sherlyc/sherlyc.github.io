import { Component, Input, OnInit } from "@angular/core";
import { IFooter } from "../../../../common/__types__/IFooter";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { CookieService } from "../../services/cookie/cookie.service";
import { RuntimeService } from "../../services/runtime/runtime.service";
import { ScriptInjectorService } from "../../services/script-injector/script-injector.service";
import { Position } from "../../services/script-injector/__types__/Position";
import { ScriptId } from "../../services/script-injector/__types__/ScriptId";
import { WindowService } from "../../services/window/window.service";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements IContentBlockComponent, OnInit {
  constructor(
    private analyticsService: AnalyticsService,
    private cookieService: CookieService,
    private scriptInjectorService: ScriptInjectorService,
    private windowService: WindowService,
    private runtimeService: RuntimeService
  ) {}
  @Input() input!: IFooter;
  shieldedSiteId = "shielded-site";
  loaded = false;
  isDesktop = false;

  async setupShieldedSite() {
    await this.scriptInjectorService.load(
      ScriptId.shieldedSite,
      "https://staticcdn.co.nz/embed/embed.js",
      Position.BOTTOM
    );

    const shieldedSiteId = this.shieldedSiteId;
    const window = this.windowService.getWindow();

    if (window.ds07o6pcmkorn) {
      new window.ds07o6pcmkorn({
        openElementId: `#${shieldedSiteId}`
      }).init();
    }
  }

  async onIntersect(event: IntersectionObserverEntry) {
    if (!this.loaded && event.isIntersecting) {
      await this.setupShieldedSite();
      this.loaded = true;
    }
  }

  sendLinkAnalytics(name: string) {
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.FOOTER_MENU_CLICKED,
      name: name
    });
  }

  ngOnInit() {
    if (this.runtimeService.isBrowser()) {
      this.isDesktop = this.windowService.isDesktopDomain();
    }
  }

  setRedirectCookie() {
    const now = new Date();
    now.setFullYear(now.getFullYear() + 1);

    const cookieValue = this.isDesktop ? "i" : "d";

    this.cookieService.set("site-view", cookieValue, {
      domain: ".stuff.co.nz",
      path: "/",
      expires: now
    });
  }
}
