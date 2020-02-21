import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ResponsiveExternalContentComponent } from "./responsive-external-content.component";
import { DomSanitizer } from "@angular/platform-browser";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { GlobalStyleDirective } from "../../shared/directives/global-style/global-style.directive";
import { MediaQuery } from "../grid-container/__types__/MediaQuery";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";

describe("ResponsiveExternalContentComponent", () => {
  let component: ResponsiveExternalContentComponent;
  let fixture: ComponentFixture<ResponsiveExternalContentComponent>;
  const input: IContentBlock = {
    type: ContentBlockType.ResponsiveExternalContent,
    url: "https://example.com",
    mobile: {
      height: "320px",
      width: "100%",
      margin: "0 0 3px 0",
      scrollable: false
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
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResponsiveExternalContentComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
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
      mobile: {
        ...input.mobile,
        scrollable: true
      }
    };

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(
      fixture.debugElement.nativeElement.querySelector("[scrolling=yes]")
    ).toBeTruthy();
  });

  it("should set margin", () => {
    component.input = input;

    fixture.detectChanges();

    expect(component.margin).toEqual(input.mobile.margin);
  });

  it("should set device css to layouts", () => {
    const mobileConfig = {
      height: "320px",
      width: "100%",
      margin: "0 0 3px 0",
      scrollable: false
    };

    const tabletConfig = {
      height: "200px",
      width: "100%",
      margin: "0 0 5px 0",
      scrollable: true
    };

    const desktopConfig = {
      height: "200",
      width: "100%",
      margin: "0 0 10px 0",
      scrollable: true
    };

    component.input = {
      ...input,
      mobile: mobileConfig,
      tablet: tabletConfig,
      desktop: desktopConfig
    };

    fixture.detectChanges();
    expect(component.layouts).toEqual({
      mobile: mobileConfig,
      tablet: tabletConfig,
      desktop: desktopConfig
    });
  });

  it("should apply the device css", () => {
    const mobileConfig = {
      height: "320px",
      width: "100%",
      margin: "0 0 3px 0",
      scrollable: false
    };

    const tabletConfig = {
      height: "200px",
      width: "100%",
      margin: "0 0 5px 0",
      scrollable: true
    };

    const desktopConfig = {
      height: "200px",
      width: "100%",
      margin: "0 0 10px 0",
      scrollable: true
    };

    component.input = {
      ...input,
      mobile: mobileConfig,
      tablet: tabletConfig,
      desktop: desktopConfig
    };

    const expected = {
      [MediaQuery.Mobile]: {
        height: "320px",
        width: "100%"
      },
      [MediaQuery.Tablet]: {
        height: "200px",
        width: "100%"
      },
      [MediaQuery.Desktop]: {
        height: "200px",
        width: "100%"
      }
    };

    fixture.detectChanges();
    expect(component.getCss()).toEqual(expected);
  });
});
