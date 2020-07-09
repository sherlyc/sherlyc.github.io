import { Injectable } from "@angular/core";
import { DeviceType } from "../../../../common/DeviceType";
import { environment } from "../../../environments/environment";
import { IStuffLoginUser } from "../authentication/__types__/IStuffLoginUser";
import { DtmService } from "../dtm/dtm.service";
import { LoggerService } from "../logger/logger.service";
import { RuntimeService } from "../runtime/runtime.service";
import { WindowService } from "../window/window.service";
import { AnalyticsEventsType } from "./__types__/AnalyticsEventsType";
import { IAdobeAnalyticsEvent } from "./__types__/IAdobeAnalyticsEvent";
import {
  AnalyticsEvent,
  IExperimentAssigned,
  IFooterMenuClicked,
  IHomepageStrapClicked,
  IMenuNavSectionClicked,
  IModuleTitleClicked,
  IMoreButtonClicked,
  IWeatherLocationChanged
} from "./__types__/IAnalyticEvents";
import { IAnalyticsService } from "./__types__/IAnalyticsService";

const home = "home";

@Injectable({
  providedIn: "root"
})
export class AnalyticsService implements IAnalyticsService {
  constructor(
    private logger: LoggerService,
    private windowService: WindowService,
    private dtmService: DtmService,
    private runtime: RuntimeService
  ) {}

  private static transformEvent(event: AnalyticsEvent): IAdobeAnalyticsEvent {
    const eventTypesRegistry: { [key in AnalyticsEventsType]: Function } = {
      [AnalyticsEventsType.PWA_DOWNLOADED]: () => ({
        event: "pwa.download"
      }),
      [AnalyticsEventsType.WEATHER_LOCATION_CHANGED]: (
        analyticEvent: IWeatherLocationChanged
      ) => ({
        event: "weather.location.change",
        "weather.location": analyticEvent!.location
      }),
      [AnalyticsEventsType.MENU_NAV_OPENED]: () => ({
        event: "menu.nav"
      }),
      [AnalyticsEventsType.LOGIN_CLIKED]: () => ({
        event: "login.signup.click",
        "login.signup.location": "top"
      }),
      [AnalyticsEventsType.AVATAR_CLICKED]: () => ({
        event: "avatar.click"
      }),
      [AnalyticsEventsType.STUFF_LOGO_CLICKED]: () => ({
        event: "stuff.logo"
      }),
      [AnalyticsEventsType.FOOTER_MENU_CLICKED]: (
        analyticEvent: IFooterMenuClicked
      ) => ({
        event: "menu.footer",
        "menu.link": analyticEvent.name
      }),
      [AnalyticsEventsType.BREAKING_NEWS_OPENED]: () => ({
        event: `breaking.news.open`
      }),
      [AnalyticsEventsType.BREAKING_NEWS_CLOSED]: () => ({
        event: `breaking.news.close`
      }),
      [AnalyticsEventsType.MORE_BUTTON_CLICKED]: (
        analyticEvent: IMoreButtonClicked
      ) => ({
        event: "more.content.button",
        "more.content.url": analyticEvent.url
      }),
      [AnalyticsEventsType.MENU_NAV_SECTION_CLICKED]: (
        analyticEvent: IMenuNavSectionClicked
      ) => ({
        event: "menu.nav",
        "menu.nav.section": analyticEvent.section
      }),
      [AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED]: (
        analyticEvent: IHomepageStrapClicked
      ) => ({
        event: "homepage.strap.click",
        "homepage.strap": analyticEvent.strapName,
        "article.headline": analyticEvent.articleHeadline,
        "article.id": analyticEvent.articleId
      }),
      [AnalyticsEventsType.EXPERIMENT]: (
        analyticEvent: IExperimentAssigned
      ) => ({
        event: "ab.testing.event",
        "ab.testing.segment.web": analyticEvent.variant,
        "ab.testing.experiment.name": analyticEvent.experiment
      }),
      [AnalyticsEventsType.MODULE_TITLE_CLICKED]: (
        analyticEvent: IModuleTitleClicked
      ) => ({
        event: "module.title.click",
        "module.title": analyticEvent.title
      }),
      [AnalyticsEventsType.HOMEPAGE_STRAP_TAG_CLICKED]: () => ({
        event: "strap.tag.click"
      })
    };
    const adobeEvent = eventTypesRegistry[event.type](event);
    return { type: "analytics", ...adobeEvent };
  }

  setup() {
    const productionEnv = "production";
    const window = this.windowService.getWindow();
    window.spade = 1;
    const deviceType = this.runtime.isBrowser()
      ? this.windowService.isDesktopDomain()
        ? DeviceType.desktop
        : DeviceType.mobile
      : undefined;
    window.digitalData = {
      page: {
        pageInfo: {
          pageID: home,
          pageName: "Stuff home",
          sysEnv: deviceType,
          variant: "1",
          version: environment.version,
          publisher: "",
          articleID: "",
          headline: "",
          author: "",
          source: "",
          lastPublishedTime: ""
        },
        category: {
          pageType: home,
          primaryCategory: home
        },
        ads: {
          environment:
            this.runtime.getEnvironmentVariable("SPADE_ENV", productionEnv) ===
            productionEnv
              ? "prod"
              : "preprod",
          exclusions: "",
          sections: []
        }
      },
      user: [
        {
          profile: [
            {
              profileInfo: {
                uid: ""
              }
            }
          ],
          segment: {}
        }
      ],
      events: []
    };
  }

  pushEvent(event: AnalyticsEvent) {
    try {
      this.windowService
        .getWindow()
        .digitalData.events.push(AnalyticsService.transformEvent(event));
    } catch (err) {
      this.logger.error(err, "AnalyticsService - pushEvent error");
    }
  }

  setUserInDataLayer(user: IStuffLoginUser | null) {
    this.windowService.getWindow().digitalData.user[0].profile[0].profileInfo = user
      ? { uid: user.profile.sub }
      : null;
  }
}
