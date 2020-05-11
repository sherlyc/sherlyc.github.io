import { TestBed } from "@angular/core/testing";
import { environment } from "../../../environments/environment";
import { DtmService } from "../dtm/dtm.service";
import { LoggerService } from "../logger/logger.service";
import { mockService, ServiceMock } from "../mocks/MockService";
import { RuntimeService } from "../runtime/runtime.service";
import { WindowService } from "../window/window.service";
import { AnalyticsEventsType } from "./__types__/AnalyticsEventsType";
import { AnalyticsService } from "./analytics.service";

describe("AnalyticsService", () => {
  let windowService: ServiceMock<WindowService>;
  let analyticsService: ServiceMock<AnalyticsService>;
  let dtmService: ServiceMock<DtmService>;
  let runtimeService: ServiceMock<RuntimeService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        },
        {
          provide: LoggerService,
          useClass: mockService(LoggerService)
        },
        {
          provide: DtmService,
          useClass: mockService(DtmService)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        }
      ]
    });
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
    dtmService = TestBed.inject(DtmService) as ServiceMock<DtmService>;
    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
    windowService = TestBed.inject(WindowService) as ServiceMock<WindowService>;
    windowService.getWindow.mockReturnValue({});
  });

  it("should be created", () => {
    expect(analyticsService).toBeTruthy();
  });

  it("should assign digitalData object to the window ", () => {
    analyticsService.setup();

    expect(windowService.getWindow().digitalData).toBeTruthy();
  });

  it("should inject SPADE version into digitalData pageInfo object", () => {
    environment.version = "FAKE_VERSION";
    analyticsService.setup();

    expect(windowService.getWindow().digitalData.page.pageInfo.version).toEqual(
      "FAKE_VERSION"
    );
  });

  it("should inject correct values (section should be empty) into digitalData object for ads to work for production", () => {
    runtimeService.getEnvironmentVariable.mockReturnValue("production");
    analyticsService.setup();

    expect(windowService.getWindow().digitalData.page.ads).toEqual({
      environment: "prod",
      exclusions: "",
      sections: []
    });
  });

  it("should inject correct values (section should be empty) into digitalData object for ads to work for non-production", () => {
    runtimeService.getEnvironmentVariable.mockReturnValue("staging");
    analyticsService.setup();

    expect(windowService.getWindow().digitalData.page.ads).toEqual({
      environment: "preprod",
      exclusions: "",
      sections: []
    });
  });

  it("should push corresponding analytics when weather bar is closed with exit button", () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: "weather.location.change",
      "weather.location": "Auckland"
    };

    analyticsService.pushEvent({
      type: AnalyticsEventsType.WEATHER_LOCATION_CHANGED,
      location: "Auckland"
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: "analytics",
      ...event
    });
  });

  it("should push corresponding analytics when the stuff logo of top menu is clicked ", () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: "stuff.logo"
    };
    analyticsService.pushEvent({
      type: AnalyticsEventsType.STUFF_LOGO_CLICKED
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: "analytics",
      ...event
    });
  });

  it("should push corresponding analytics when a link on footer menu is clicked ", () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: "menu.footer",
      "menu.link": "twitter"
    };
    analyticsService.pushEvent({
      type: AnalyticsEventsType.FOOTER_MENU_CLICKED,
      name: "twitter"
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: "analytics",
      ...event
    });
  });

  it("should push corresponding analytics when the breaking news banner is open", () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: "breaking.news.open"
    };
    analyticsService.pushEvent({
      type: AnalyticsEventsType.BREAKING_NEWS_OPENED
    });
    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: "analytics",
      ...event
    });
  });

  it("should push corresponding analytics when the breaking news banner is closed", () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: "breaking.news.close"
    };
    analyticsService.pushEvent({
      type: AnalyticsEventsType.BREAKING_NEWS_CLOSED
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: "analytics",
      ...event
    });
  });

  it("should push corresponding analytics when the more button is clicked", () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: "more.content.button",
      "more.content.url": "/national"
    };
    analyticsService.pushEvent({
      type: AnalyticsEventsType.MORE_BUTTON_CLICKED,
      url: "/national"
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: "analytics",
      ...event
    });
  });

  it("should push corresponding analytics when menu section is clicked", () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: "menu.nav",
      "menu.nav.section": "Entertainment"
    };

    analyticsService.pushEvent({
      type: AnalyticsEventsType.MENU_NAV_SECTION_CLICKED,
      section: "Entertainment"
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: "analytics",
      ...event
    });
  });

  it("should push corresponding analytics when homepage strap is clicked", () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const strapName = "National";
    const headline = "Headline";
    const articleId = "123123";
    const event = {
      event: "homepage.strap.click",
      "homepage.strap": strapName,
      "article.headline": headline,
      "article.id": articleId
    };

    analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: headline,
      articleId: articleId
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: "analytics",
      ...event
    });
  });

  it("should push corresponding analytics for breaking news experiment", () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const variant = "purpleHeadline";
    const experiment = "Toucan";
    const event = {
      event: "ab.testing.event",
      "ab.testing.segment.web": variant,
      "ab.testing.experiment.name": experiment
    };

    analyticsService.pushEvent({
      type: AnalyticsEventsType.EXPERIMENT,
      variant,
      experiment
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: "analytics",
      ...event
    });
  });

  it("should push corresponding analytics for login text clicked", () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: "login.signup.click",
      "login.signup.location": "top"
    };

    analyticsService.pushEvent({
      type: AnalyticsEventsType.LOGIN_CLIKED
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: "analytics",
      ...event
    });
  });

  it("should push corresponding analytics for login text clicked", () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: "avatar.click"
    };

    analyticsService.pushEvent({
      type: AnalyticsEventsType.AVATAR_CLICKED
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: "analytics",
      ...event
    });
  });

  it("should push pwa download analytics", () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();

    const event = {
      event: "pwa.download"
    };

    analyticsService.pushEvent({
      type: AnalyticsEventsType.PWA_DOWNLOADED
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: "analytics",
      ...event
    });
  });

  it("should allow updating datalayer with user data", () => {
    analyticsService.setup();

    analyticsService.setUserInDataLayer(null);
    expect(
      windowService.getWindow().digitalData.user[0].profile[0].profileInfo
    ).toBeNull();

    const user = {
      id_token: "yourIdToken",
      access_token: "yourAccessToken",
      profile: {
        sub: "11234",
        auth_time: 1508961560,
        kid: "sffx",
        jti: "0fab3adc-6106-4b20-bec6-45144b721b31",
        name: "user123",
        preferred_username: "user123@mail.com",
        given_name: "firstName",
        family_name: "surname",
        nickname: "user123",
        profile:
          "https://my.local.stuff.co.nz:8443/stuff-ssp-web//profile/user123",
        picture:
          "https://static2.stuff.co.nz/145453/static/images/profile_avatar_n_sm.gif",
        gender: "m",
        locale: "en_NZ",
        birthdate: "1992"
      }
    };

    analyticsService.setUserInDataLayer(user);
    expect(
      windowService.getWindow().digitalData.user[0].profile[0].profileInfo
    ).toStrictEqual({ uid: "11234" });
  });

  it("should set window.spade as 1", () => {
    const fakeWindow: any = {};
    windowService.getWindow.mockReturnValue(fakeWindow);

    expect(fakeWindow.spade).toBeFalsy();
    analyticsService.setup();
    expect(fakeWindow.spade).toBe(1);
  });

  it("should push corresponding analytics for module title clicked", () => {
    analyticsService.setup();
    windowService.getWindow().digitalData.events.push = jest.fn();
    const strapName = "National";

    const event = {
      event: "module.title.click",
      "module.title": strapName
    };

    analyticsService.pushEvent({
      type: AnalyticsEventsType.MODULE_TITLE_CLICKED,
      title: strapName
    });

    expect(
      windowService.getWindow().digitalData.events.push
    ).toHaveBeenCalledWith({
      type: "analytics",
      ...event
    });
  });
});
