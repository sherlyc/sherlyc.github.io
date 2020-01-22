import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FeatureArticleComponent } from "./feature-article.component";
import { SharedModule } from "../../shared/shared.module";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IFeatureArticle } from "../../../../common/__types__/IFeatureArticle";
import { By } from "@angular/platform-browser";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";

describe("FeatureArticleComponent", () => {
  let component: FeatureArticleComponent;
  let fixture: ComponentFixture<FeatureArticleComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const articleData: IFeatureArticle = {
    type: ContentBlockType.FeatureArticle,
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
      declarations: [FeatureArticleComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    }).compileComponents();

    analyticsService = TestBed.get(AnalyticsService);

    fixture = TestBed.createComponent(FeatureArticleComponent);
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

  it("should set gradient box color and text color when applyGradient is true", () => {
    const boxColor = "white";
    const textColor = "blue";
    component.input = {
      ...articleData,
      boxColor,
      textColor,
      applyGradient: true
    };

    fixture.detectChanges();

    expect(component.boxStyle).toEqual(
      expect.objectContaining({
        "background-image": `linear-gradient(rgba(0,0,0,0) 0%, ${boxColor} 30px, ${boxColor} 100%)`,
        color: textColor
      })
    );
  });

  it("should set solid colour background and text color when applyGradient is false", () => {
    const boxColor = "white";
    const textColor = "green";
    component.input = {
      ...articleData,
      boxColor,
      textColor,
      applyGradient: false
    };

    fixture.detectChanges();

    expect(component.boxStyle).toEqual(
      expect.objectContaining({
        background: boxColor,
        color: textColor
      })
    );
  });
});
