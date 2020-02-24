import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ResponsiveExternalContentComponent } from "./responsive-external-content.component";
import { DomSanitizer } from "@angular/platform-browser";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { GlobalStyleDirective } from "../../shared/directives/global-style/global-style.directive";
import { MediaQuery } from "../grid-container/__types__/MediaQuery";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IResponsiveExternalContentDeviceConfig } from "../../../../common/__types__/IResponsiveExternalContent";
import { GlobalStyleService } from "../../services/global-style/global-style.service";
import { mockService, ServiceMock } from "../../services/mocks/MockService";

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
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalStyleDirective, ResponsiveExternalContentComponent],
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
    component.input = {
      ...input,
      mobile: {
        ...input.mobile,
        margin: "0 10px"
      }
    };

    fixture.detectChanges();

    expect(globalStyleService.injectStyle).toHaveBeenCalledWith({
      [MediaQuery.Mobile]: {
        height: mobileConfig.height,
        width: mobileConfig.width
      },
      [MediaQuery.Tablet]: {
        height: mobileConfig.height,
        width: mobileConfig.width
      },
      [MediaQuery.Desktop]: {
        height: mobileConfig.height,
        width: mobileConfig.width
      }
    });
  });

  it("should set device css to layouts", () => {
    component.input = {
      ...input,
      mobile: mobileConfig,
      tablet: tabletConfig,
      desktop: desktopConfig
    };

    fixture.detectChanges();
    expect(component.layouts).toEqual({
      mobile: {
        height: mobileConfig.height,
        width: mobileConfig.width
      },
      tablet: {
        height: tabletConfig.height,
        width: tabletConfig.width
      },
      desktop: {
        height: desktopConfig.height,
        width: desktopConfig.width
      }
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
        height: mobileConfig.height,
        width: mobileConfig.width
      },
      [MediaQuery.Tablet]: {
        height: tabletConfig.height,
        width: tabletConfig.width
      },
      [MediaQuery.Desktop]: {
        height: desktopConfig.height,
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
        height: mobileConfig.height,
        width: mobileConfig.width
      },
      [MediaQuery.Tablet]: {
        height: mobileConfig.height,
        width: mobileConfig.width
      },
      [MediaQuery.Desktop]: {
        height: mobileConfig.height,
        width: mobileConfig.width
      }
    };

    fixture.detectChanges();

    expect(component.getCss()).toEqual(expected);
  });
});
