import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { By } from "@angular/platform-browser";
import { Orientation } from "../../../../../common/__types__/IHomepageArticle";
import { AnalyticsService } from "../../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../../services/analytics/__types__/AnalyticsEventsType";
import { mockService, ServiceMock } from "../../../services/mocks/MockService";
import { PlayStuffVideoComponent } from "./play-stuff-video.component";

describe("PlayStuffVideoComponent", () => {
  let component: PlayStuffVideoComponent;
  let fixture: ComponentFixture<PlayStuffVideoComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayStuffVideoComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    }).compileComponents();
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayStuffVideoComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should set inputs", () => {
    component.image = "hello.png";
    component.id = "1";
    component.text = "text";
    component.highlight = false;
    component.orientation = {
      mobile: Orientation.Landscape,
      tablet: Orientation.Portrait,
      desktop: Orientation.Landscape
    };

    fixture.detectChanges();

    const wrapper: HTMLDivElement = fixture.debugElement.query(
      By.css(".wrapper")
    ).nativeElement;
    expect(wrapper.className).not.toContain("highlight");
    expect(wrapper.className).toContain("landscape-mobile");
    expect(wrapper.className).toContain("portrait-tablet");
    expect(wrapper.className).toContain("landscape-desktop");

    const anchor: HTMLAnchorElement = fixture.debugElement.query(By.css("a"))
      .nativeElement;
    expect(anchor.href).toBe(
      `https://play.stuff.co.nz/details/_${component.id}`
    );

    const image: HTMLImageElement = fixture.debugElement.query(By.css("img"))
      .nativeElement;
    expect(image.getAttribute("src")).toBe(component.image);
    expect(image.getAttribute("alt")).toBe(component.text);

    const text: HTMLDivElement = fixture.debugElement.query(By.css(".text"))
      .nativeElement;
    expect(text.textContent).toBe(component.text);
  });

  it("should send analytics when clicked", () => {
    component.id = "1";
    component.text = "text";

    fixture.detectChanges();
    const anchor: HTMLAnchorElement = fixture.debugElement.query(By.css("a"))
      .nativeElement;
    anchor.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName: "homepagev2PlayStuff",
      articleHeadline: component.text,
      articleId: component.id
    });
  });

  it("should have a hover label", () => {
    fixture.detectChanges();
    const hoverLabel: HTMLElement = fixture.debugElement.query(By.css(".hover-label")).nativeElement;

    expect(hoverLabel).toBeTruthy();
  });
});
