import { Component, Input, OnInit } from "@angular/core";
import { IContentBlockComponent } from "../__types__/IContentBlockComponent";
import { IFooter } from "../../../../common/__types__/IFooter";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { CookieService } from "../../services/cookie/cookie.service";
import { ScriptInjectorService } from "../../services/script-injector/script-injector.service";
import { ScriptId } from "../../services/script-injector/__types__/ScriptId";
import { Position } from "../../services/script-injector/__types__/Position";
import { WindowService } from "../../services/window/window.service";

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
    private windowService: WindowService
  ) {}
  @Input() input!: IFooter;
  shieldedSiteId = "shielded-site";

  ngOnInit() {
    this.setupShieldedSite();
  }

  async setupShieldedSite() {
    await this.scriptInjectorService.load(
      ScriptId.shieldedSite,
      "https://d3f5l8ze0o4j2m.cloudfront.net/m87/k33spt.js",
      Position.BOTTOM
    );

    const shieldedSiteId = this.shieldedSiteId;
    const window = this.windowService.getWindow();

    if (window.ds07o6pcmkorn) {
      window.onload = function() {
        const shieldedSiteFrame = new window.ds07o6pcmkorn({
          openElementId: `#${shieldedSiteId}`
        });
        shieldedSiteFrame.init();
      };
    }
  }

  sendLinkAnalytics(name: string) {
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.FOOTER_MENU_CLICKED,
      name: name
    });
  }

  goDesktop() {
    const now = new Date();
    now.setFullYear(now.getFullYear() + 1);

    this.cookieService.set("site-view", "d", {
      domain: ".stuff.co.nz",
      path: "/",
      expires: now
    });
  }
}
