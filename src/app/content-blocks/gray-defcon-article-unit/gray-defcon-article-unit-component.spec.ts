import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IDefconArticleUnit } from "../../../../common/__types__/IDefconArticleUnit";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { SharedModule } from "../../shared/shared.module";
import { GrayDefconArticleUnitComponent } from "./gray-defcon-article-unit.component";

describe("GrayDefconArticleUnitComponent", () => {
  let component: GrayDefconArticleUnitComponent;
  let fixture: ComponentFixture<GrayDefconArticleUnitComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const articleData: IDefconArticleUnit = {
    type: ContentBlockType.DefconArticleUnit,
    id: "123123",
    strapName: "National",
    indexHeadline: "Dummy Headline",
    introText: "Dummy intro text",
    title: "Title",
    linkUrl: "https://dummyurl.com",
    imageSrc: "https://dummyimagesrc.com",
    lastPublishedTime: 123123,
    headlineFlags: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [GrayDefconArticleUnitComponent],
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

    fixture = TestBed.createComponent(GrayDefconArticleUnitComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrayDefconArticleUnitComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should send analytics when clicked", () => {
    const { strapName, title, id } = articleData;
    component.input = articleData;
    fixture.detectChanges();

    const anchorTag = fixture.debugElement.query(By.css("a")).nativeElement;
    anchorTag.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: title,
      articleId: id
    });
  });
});
