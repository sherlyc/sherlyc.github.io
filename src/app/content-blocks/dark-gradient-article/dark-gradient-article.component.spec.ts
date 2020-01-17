import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DarkGradientArticleComponent } from "./dark-gradient-article.component";
import { SharedModule } from "../../shared/shared.module";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IDarkGradientArticle } from "../../../../common/__types__/IDarkGradientArticle";
import { By } from "@angular/platform-browser";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";

describe("DarkGradientArticleComponent", () => {
  let component: DarkGradientArticleComponent;
  let fixture: ComponentFixture<DarkGradientArticleComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const articleData: IDarkGradientArticle = {
    type: ContentBlockType.DarkGradientArticle,
    id: "123123",
    strapName: "National",
    indexHeadline: "Dummy Headline",
    introText: "Dummy intro text",
    title: "Title",
    linkUrl: "https://dummyurl.com",
    imageSrc: "https://dummyimagesrc.com",
    imageSrcSet: "https://dummyimagesrc.com",
    lastPublishedTime: 123123,
    headlineFlags: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [DarkGradientArticleComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    }).compileComponents();

    analyticsService = TestBed.get(AnalyticsService);

    fixture = TestBed.createComponent(DarkGradientArticleComponent);
    component = fixture.componentInstance;
  }));

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
