import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { By } from "@angular/platform-browser";
import { TagLinkComponent } from "./tag-link.component";
import { AnalyticsService } from "../../../services/analytics/analytics.service";
import { mockService, ServiceMock } from "../../../services/mocks/MockService";
import { AnalyticsEventsType } from "../../../services/analytics/__types__/AnalyticsEventsType";

describe("TagLinkComponent", () => {
  let component: TagLinkComponent;
  let fixture: ComponentFixture<TagLinkComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagLinkComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagLinkComponent);
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set color on link", () => {
    component.color = "red";

    fixture.detectChanges();
    const link = fixture.debugElement.query(By.css("a")).nativeElement;

    expect(link.style.color).toBe(component.color);
  });

  it("should set url on link", () => {
    component.url = "https://www.example.com/";

    fixture.detectChanges();
    const link = fixture.debugElement.query(By.css("a")).nativeElement;

    expect(link.href).toBe(component.url);
  });

  it("should render name in link", () => {
    component.name = "travel";

    fixture.detectChanges();
    const link = fixture.debugElement.query(By.css("a")).nativeElement;

    expect(link.textContent).toBe(component.name);
  });

  it("should send analytics event when clicking the link", () => {
    component.name = "travel";

    fixture.detectChanges();
    const link: HTMLAnchorElement = fixture.debugElement.query(By.css("a"))
      .nativeElement;
    link.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_TAG_CLICKED
    });
  });
});
