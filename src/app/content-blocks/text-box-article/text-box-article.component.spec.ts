import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { TextBoxArticleComponent } from "./text-box-article.component";
import { SharedModule } from "../../shared/shared.module";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { ITextBoxArticle } from "../../../../common/__types__/ITextBoxArticle";
import { By } from "@angular/platform-browser";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";

describe("DarkGradientArticleComponent", () => {
  let component: TextBoxArticleComponent;
  let fixture: ComponentFixture<TextBoxArticleComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const articleData: ITextBoxArticle = {
    type: ContentBlockType.TextBoxArticle,
    id: "123123",
    strapName: "National",
    indexHeadline: "Dummy Headline",
    introText: "Dummy intro text",
    title: "Title",
    linkUrl: "https://dummyurl.com",
    imageSrc: "https://dummyimagesrc.com",
    imageSrcSet: "https://dummyimagesrc.com",
    lastPublishedTime: 123123,
    headlineFlags: [],
    boxColor: "red",
    textColor: "white",
    applyGradient: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [TextBoxArticleComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    }).compileComponents();

    analyticsService = TestBed.get(AnalyticsService);

    fixture = TestBed.createComponent(TextBoxArticleComponent);
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
