import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ResponsiveExternalContentComponent } from "./responsive-external-content.component";
import { By, DomSanitizer } from "@angular/platform-browser";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { MediaQuery } from "../grid-container/__types__/MediaQuery";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IResponsiveExternalContentDeviceConfig } from "../../../../common/__types__/IResponsiveExternalContent";
import { GlobalStyleService } from "../../services/global-style/global-style.service";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { Directive, Input } from "@angular/core";

describe("ResponsiveExternalContentComponent", () => {
  let component: ResponsiveExternalContentComponent;
  let fixture: ComponentFixture<ResponsiveExternalContentComponent>;
  let globalStyleService: ServiceMock<GlobalStyleService>;

  const mobileConfig: IResponsiveExternalContentDeviceConfig = {
    height: "320px",
    width: "100%",
    margin: "0 0 3px 0"
  };

  const tabletConfig: IResponsiveExternalContentDeviceConfig = {
    height: "200px",
    width: "100%",
    margin: "0 0 5px 0"
  };

  const desktopConfig: IResponsiveExternalContentDeviceConfig = {
    height: "200",
    width: "100%",
    margin: "0 0 10px 0"
  };

  const input: IContentBlock = {
    type: ContentBlockType.ResponsiveExternalContent,
    url: "https://example.com",
    mobile: {
      ...mobileConfig
    },
    lazyLoad: false
  };

  @Directive({
    selector: "[appGlobalStyle]"
  })
  class MockGlobalStyleDirective {
    @Input() appGlobalStyle?: object;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MockGlobalStyleDirective,
        ResponsiveExternalContentComponent
      ],
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            sanitize: () => "safe",
            bypassSecurityTrustResourceUrl: (url: string) => url
          }
        },
        {
          provide: GlobalStyleService,
          useClass: mockService(GlobalStyleService)
        }
      ]
    }).compileComponents();

    globalStyleService = TestBed.get(GlobalStyleService);
    fixture = TestBed.createComponent(ResponsiveExternalContentComponent);
    component = fixture.componentInstance;
  });

  it("should create and default to no scrolling", () => {
    component.input = input;

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(
      fixture.debugElement.nativeElement.querySelector("[scrolling=no]")
    ).toBeTruthy();
  });

  it("should load iframe initially when lazyload is not enabled", () => {
    component.input = { ...input, lazyLoad: false };

    fixture.detectChanges();

    const iframe = fixture.debugElement.query(By.css("iframe"));
    expect(iframe).toBeTruthy();
  });

  it("should not load iframe initially when lazyload is enabled", () => {
    component.input = { ...input, lazyLoad: true };

    fixture.detectChanges();

    const iframe = fixture.debugElement.query(By.css("iframe"));
    expect(iframe).toBeFalsy();
  });

  it("should set scrolling attribute", () => {
    component.input = {
      ...input,
      scrollable: true,
      mobile: {
        ...input.mobile
      }
    };

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(
      fixture.debugElement.nativeElement.querySelector("[scrolling=yes]")
    ).toBeTruthy();
  });

  it("margin should be injected via global style service", () => {
    const margin = "0 10px";

    component.input = {
      ...input,
      mobile: {
        ...input.mobile,
        margin
      }
    };

    fixture.detectChanges();

    expect(globalStyleService.injectStyle).toHaveBeenCalledWith({
      [MediaQuery.Mobile]: { margin },
      [MediaQuery.Tablet]: { margin },
      [MediaQuery.Desktop]: { margin }
    });
  });

  it("should apply css according to device configs", () => {
    component.input = {
      ...input,
      mobile: mobileConfig,
      tablet: tabletConfig,
      desktop: desktopConfig
    };

    const expected = {
      [MediaQuery.Mobile]: {
        paddingBottom: mobileConfig.height,
        width: mobileConfig.width
      },
      [MediaQuery.Tablet]: {
        paddingBottom: tabletConfig.height,
        width: tabletConfig.width
      },
      [MediaQuery.Desktop]: {
        paddingBottom: desktopConfig.height,
        width: desktopConfig.width
      }
    };

    fixture.detectChanges();
    expect(component.getCss()).toEqual(expected);
  });

  it("should fall back to mobile config if tablet and desktop configs are not specified", () => {
    component.input = {
      ...input,
      mobile: {
        ...input.mobile
      }
    };

    const expected = {
      [MediaQuery.Mobile]: {
        paddingBottom: mobileConfig.height,
        width: mobileConfig.width
      },
      [MediaQuery.Tablet]: {
        paddingBottom: mobileConfig.height,
        width: mobileConfig.width
      },
      [MediaQuery.Desktop]: {
        paddingBottom: mobileConfig.height,
        width: mobileConfig.width
      }
    };

    fixture.detectChanges();

    expect(component.getCss()).toEqual(expected);
  });

  it("should load external content when intersect", async () => {
    component.input = {
      ...input,
      lazyLoad: true
    };
    fixture.detectChanges();
    expect(component.isShown).toBeFalsy();

    const fakeEvent = { isIntersecting: true } as IntersectionObserverEntry;
    component.onIntersect(fakeEvent);

    expect(component.isShown).toBeTruthy();
    // const iframe = fixture.debugElement.query(By.css("iframe"));
    // expect(iframe).toBeTruthy();
  });
});
