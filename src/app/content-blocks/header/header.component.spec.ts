import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Subject } from "rxjs";
import { mockService, ServiceMock } from "src/app/services/mocks/MockService";
import { WeatherLocations } from "../../../../common/WeatherLocations";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { IStuffLoginUser } from "../../services/authentication/__types__/IStuffLoginUser";
import { ConfigService } from "../../services/config/config.service";
import { IEnvironmentDefinition } from "../../services/config/__types__/IEnvironmentDefinition";
import { RuntimeService } from "../../services/runtime/runtime.service";
import { StoreService } from "../../services/store/store.service";
import { WindowService } from "../../services/window/window.service";
import { CopyrightComponent } from "../../shared/components/copyright/copyright.component";
import { HeaderComponent } from "./header.component";

const OriginalNow = global.Date.now;

describe("Header", () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;
  let configService: ServiceMock<ConfigService>;
  let authenticationService: ServiceMock<AuthenticationService>;
  let component: HeaderComponent;
  let runtimeService: ServiceMock<RuntimeService>;
  let windowService: ServiceMock<WindowService>;
  let storeService: ServiceMock<StoreService>;
  const profileUrl = "https://my.stuff.co.nz/publicprofile";

  const loggedInUser = {
    id_token: "yourIdToken",
    access_token: "yourAccessToken",
    profile: {
      sub: "1234",
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
  } as IStuffLoginUser;

  afterEach(() => {
    global.Date.now = OriginalNow;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent, CopyrightComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        },
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        },
        {
          provide: AuthenticationService,
          useClass: mockService(AuthenticationService)
        },
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: StoreService,
          useClass: mockService(StoreService)
        }
      ]
    }).compileComponents();
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
    configService = TestBed.inject(ConfigService) as ServiceMock<ConfigService>;
    authenticationService = TestBed.inject(
      AuthenticationService
    ) as ServiceMock<AuthenticationService>;
    authenticationService.authenticationStateChange = new Subject<any>();
    windowService = TestBed.inject(WindowService) as ServiceMock<WindowService>;
    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
    storeService = TestBed.inject(StoreService) as ServiceMock<StoreService>;

    configService.getConfig.mockReturnValue({
      loginLibrary: {
        authProvider: "https://my.stuff.co.nz"
      }
    } as IEnvironmentDefinition);

    runtimeService.isBrowser.mockReturnValue(true);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it("should display navigation when hamburger menu is clicked", () => {
    fixture.detectChanges();

    let navigation = fixture.debugElement.query(By.css(".navigation"));
    expect(navigation).toBeFalsy();

    fixture.componentInstance.toggleMenu();
    fixture.detectChanges();

    navigation = fixture.debugElement.query(By.css(".navigation"));
    expect(navigation).toBeTruthy();
  });

  it("should display stuff logo by default", () => {
    (global as any).Date.now = () =>
      new Date("2019-01-01T00:00:00.000Z").getTime();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(".stuff-logo"))).toBeTruthy();
    expect(fixture.debugElement.query(By.css(".puna-logo"))).toBeFalsy();
  });

  it("should display puna logo", () => {
    (global as any).Date.now = () =>
      new Date("2019-09-09T17:00:00.000Z").getTime();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css(".stuff-logo"))).toBeFalsy();
    expect(fixture.debugElement.query(By.css(".puna-logo"))).toBeTruthy();
  });

  it("should hide search bar by default", () => {
    fixture.componentInstance.toggleMenu();
    fixture.detectChanges();

    const searchBar = fixture.debugElement.query(By.css(".search-bar"));

    expect(searchBar).toBeFalsy();
  });

  it("should show search bar on desktop domain", () => {
    windowService.isDesktopDomain.mockReturnValue(true);
    fixture.componentInstance.toggleMenu();
    fixture.detectChanges();

    const searchBar = fixture.debugElement.query(By.css(".search-bar"));

    expect(searchBar).toBeTruthy();
  });

  it("should not call isDesktopDomain on server side", () => {
    runtimeService.isBrowser.mockReturnValue(false);
    fixture.detectChanges();

    expect(windowService.isDesktopDomain).not.toHaveBeenCalled();
  });

  it("should hide search menu by default", () => {
    fixture.detectChanges();

    const searchMenu = fixture.debugElement.query(By.css(".search-menu"));

    expect(searchMenu).toBeFalsy();
  });

  it("should show search menu on desktop domain", () => {
    windowService.isDesktopDomain.mockReturnValue(true);
    fixture.detectChanges();

    const searchMenu = fixture.debugElement.query(By.css(".search-menu"));

    expect(searchMenu).toBeTruthy();
  });

  describe("Analytics", () => {
    it("should push analytics event when hamburger menu is opened", () => {
      fixture.componentInstance.navigationVisible = false;
      fixture.detectChanges();

      fixture.debugElement.query(By.css(".menu")).nativeElement.click();

      expect(analyticsService.pushEvent).toHaveBeenCalledWith({
        type: AnalyticsEventsType.MENU_NAV_OPENED
      });
    });

    it("should push analytics event when stuff logo is clicked", () => {
      fixture.debugElement.query(By.css(".title")).nativeElement.click();

      expect(analyticsService.pushEvent).toHaveBeenCalledWith({
        type: AnalyticsEventsType.STUFF_LOGO_CLICKED
      });
    });

    it("should push analytics event when menu section is clicked", () => {
      component.navigationVisible = true;
      fixture.detectChanges();
      fixture.debugElement
        .query(By.css(".section-Homed"))
        .nativeElement.click();

      expect(analyticsService.pushEvent).toHaveBeenCalledWith({
        type: AnalyticsEventsType.MENU_NAV_SECTION_CLICKED,
        section: "Homed"
      });
    });
  });

  describe("User authentication", () => {
    it("should show a Login text when the user is not logged in", () => {
      component.navigationVisible = true;
      component.isLoggedIn = false;
      fixture.detectChanges();

      const text = fixture.debugElement.query(By.css(".user")).nativeElement
        .textContent;

      expect(text).toBe("Login");
    });

    it("should initiate a login when user clicks on login", () => {
      component.navigationVisible = true;

      fixture.detectChanges();
      fixture.debugElement.query(By.css(".login-text")).nativeElement.click();
      fixture.detectChanges();

      expect(authenticationService.login).toHaveBeenCalled();
    });

    it("should send analytics when user clicks on login", () => {
      component.navigationVisible = true;

      fixture.detectChanges();
      fixture.debugElement.query(By.css(".login-text")).nativeElement.click();
      fixture.detectChanges();

      expect(analyticsService.pushEvent).toHaveBeenCalledWith({
        type: AnalyticsEventsType.LOGIN_CLIKED
      });
    });

    it("should send analytics when user clicks on avatar", async () => {
      component.isLoggedIn = true;
      fixture.detectChanges();

      fixture.debugElement.query(By.css(".user")).nativeElement.click();

      expect(analyticsService.pushEvent).toHaveBeenCalledWith({
        type: AnalyticsEventsType.AVATAR_CLICKED
      });
    });

    it("should show an avatar when the user is logged in", async () => {
      await component.ngOnInit();
      authenticationService.authenticationStateChange.next(loggedInUser);
      fixture.detectChanges();

      const user = fixture.debugElement.query(By.css(".user"));

      expect(user).toBeTruthy();
      expect(user.nativeElement.getAttribute("href")).toBe(profileUrl);
    });
  });

  it("should show our generic avatar when user picture is a my.stuff generic avatar", async () => {
    await component.ngOnInit();
    authenticationService.authenticationStateChange.next(loggedInUser);

    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css(".avatar"));
    expect(avatar.nativeElement.getAttribute("src")).toBe(
      "/spade/assets/icons/avatar.svg"
    );
  });

  it("should show user picture when it has a profile picture to show", async () => {
    loggedInUser.profile.picture =
      "www.stuff-static.com/image/my-social-net-pic.png";
    await component.ngOnInit();
    authenticationService.authenticationStateChange.next(loggedInUser);

    fixture.detectChanges();

    const avatar = fixture.debugElement.query(By.css(".avatar"));
    expect(avatar.nativeElement.getAttribute("src")).toBe(
      "www.stuff-static.com/image/my-social-net-pic.png"
    );
  });

  it("should update weather link when user chose the location", async () => {
    runtimeService.isBrowser.mockReturnValue(true);
    windowService.isDesktopDomain.mockReturnValue(true);
    component.navigationVisible = true;
    storeService.get.mockReturnValue(WeatherLocations.NewPlymouth);

    fixture.detectChanges();
    const weatherAnchor: HTMLAnchorElement = fixture.debugElement.query(
      By.css(".section-Weather")
    ).nativeElement;
    expect(weatherAnchor.getAttribute("href")).toEqual(
      "/national/weather/new-plymouth-forecast"
    );
  });

  it("should not render weather menu item on mobile", async () => {
    runtimeService.isBrowser.mockReturnValue(true);
    windowService.isDesktopDomain.mockReturnValue(false);
    component.navigationVisible = true;
    storeService.get.mockReturnValue(WeatherLocations.NewPlymouth);

    fixture.detectChanges();
    const weatherAnchor = fixture.debugElement.query(
      By.css(".section-Weather")
    );
    expect(weatherAnchor).toBeFalsy();
  });

  it("should always render weather menu in server side", async () => {
    runtimeService.isBrowser.mockReturnValue(false);
    component.navigationVisible = true;

    fixture.detectChanges();
    const weatherAnchor: HTMLAnchorElement = fixture.debugElement.query(
      By.css(".section-Weather")
    ).nativeElement;
    expect(weatherAnchor.getAttribute("href")).toEqual("/national/weather/");
  });
});
