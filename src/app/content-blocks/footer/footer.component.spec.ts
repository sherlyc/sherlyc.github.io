import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { CookieService } from "../../services/cookie/cookie.service";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { RuntimeService } from "../../services/runtime/runtime.service";
import { ScriptInjectorService } from "../../services/script-injector/script-injector.service";
import { Position } from "../../services/script-injector/__types__/Position";
import { ScriptId } from "../../services/script-injector/__types__/ScriptId";
import { WindowService } from "../../services/window/window.service";
import { CopyrightComponent } from "../../shared/components/copyright/copyright.component";
import { FooterComponent } from "./footer.component";

describe("Footer", () => {
  let fixture: ComponentFixture<FooterComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;
  let cookieService: ServiceMock<CookieService>;
  let scriptInjectorService: ServiceMock<ScriptInjectorService>;
  let windowService: ServiceMock<WindowService>;
  let runtimeService: ServiceMock<RuntimeService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent, CopyrightComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        },
        {
          provide: CookieService,
          useClass: mockService(CookieService)
        },
        {
          provide: ScriptInjectorService,
          useClass: mockService(ScriptInjectorService)
        },
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        }
      ]
    }).compileComponents();
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
    cookieService = TestBed.inject(CookieService) as ServiceMock<CookieService>;
    scriptInjectorService = TestBed.inject(
      ScriptInjectorService
    ) as ServiceMock<ScriptInjectorService>;
    windowService = TestBed.inject(WindowService) as ServiceMock<WindowService>;
    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;

    fixture = TestBed.createComponent(FooterComponent);
  });

  it("push analytics event when twitter link is clicked", () => {
    fixture.debugElement
      .query(By.css('a[aria-label="Twitter"]'))
      .nativeElement.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.FOOTER_MENU_CLICKED,
      name: "Twitter"
    });
  });

  it("push analytics event when Facebook link is clicked", () => {
    fixture.debugElement
      .query(By.css('a[aria-label="Facebook"]'))
      .nativeElement.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.FOOTER_MENU_CLICKED,
      name: "Facebook"
    });
  });

  it("push analytics event when Snapchat link is clicked", () => {
    fixture.debugElement
      .query(By.css('a[aria-label="Snapchat"]'))
      .nativeElement.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.FOOTER_MENU_CLICKED,
      name: "Snapchat"
    });
  });

  it("should show desktop site link on mobile and set cookie when clicked", () => {
    runtimeService.isBrowser.mockReturnValue(true);
    windowService.isDesktopDomain.mockReturnValue(false);
    fixture.detectChanges();

    const desktopLink = fixture.debugElement.query(By.css(".redirect-desktop"))
      .nativeElement;

    const mobileLink = fixture.debugElement.query(By.css(".redirect-mobile"));

    expect(desktopLink).toBeTruthy();
    expect(mobileLink).toBeFalsy();

    desktopLink.click();

    expect(cookieService.set).toHaveBeenCalledWith("site-view", "d", {
      domain: ".stuff.co.nz",
      expires: expect.any(Date),
      path: "/"
    });
  });

  it("should show mobile site link on desktop and set cookie when clicked", () => {
    runtimeService.isBrowser.mockReturnValue(true);
    windowService.isDesktopDomain.mockReturnValue(true);
    fixture.detectChanges();

    const desktopLink = fixture.debugElement.query(By.css(".redirect-desktop"));

    const mobileLink = fixture.debugElement.query(By.css(".redirect-mobile"))
      .nativeElement;

    expect(desktopLink).toBeFalsy();
    expect(mobileLink).toBeTruthy();

    mobileLink.click();

    expect(cookieService.set).toHaveBeenCalledWith("site-view", "i", {
      domain: ".stuff.co.nz",
      expires: expect.any(Date),
      path: "/"
    });
  });

  describe("Shielded Site", () => {
    it("should have shielded-site as id on link that opens dialog", () => {
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css("#shielded-site"));

      expect(link).toBeTruthy();
    });

    it("should load shielded site script when component is visible", async () => {
      const window = { onload: jest.fn() };
      windowService.getWindow.mockReturnValue(window);

      await fixture.componentInstance.onIntersect({
        isIntersecting: true
      } as IntersectionObserverEntry);

      expect(scriptInjectorService.load).toHaveBeenCalledWith(
        ScriptId.shieldedSite,
        "https://staticcdn.co.nz/embed/embed.js",
        Position.BOTTOM
      );
    });

    it("should inject function that initialises the shielded site into window when component is visible", async () => {
      const window = {
        onload: jest.fn(),
        ds07o6pcmkorn: jest.fn().mockImplementation(() => {
          return { init: jest.fn() };
        })
      };
      windowService.getWindow.mockReturnValue(window);

      await fixture.componentInstance.onIntersect({
        isIntersecting: true
      } as IntersectionObserverEntry);

      expect(window.ds07o6pcmkorn).toHaveBeenCalled();
    });
  });
});
