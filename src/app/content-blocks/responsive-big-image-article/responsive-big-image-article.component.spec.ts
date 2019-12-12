import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ResponsiveBigImageArticleComponent } from "./responsive-big-image-article.component";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IResponsiveBigImageArticleUnit } from "../../../../common/__types__/IResponsiveBigImageArticleUnit";
import { SharedModule } from "../../shared/shared.module";
import { By } from "@angular/platform-browser";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { HeadlineComponent } from "../../shared/components/headline/headline.component";

describe("Responsive Big Image Article", () => {
  let fixture: ComponentFixture<ResponsiveBigImageArticleComponent>;
  let component: ResponsiveBigImageArticleComponent;
  let analyticsService: ServiceMock<AnalyticsService>;

  const twoDaysAgoDateInSeconds =
    new Date().setDate(new Date().getDate() - 2) / 1000;
  const articleData: IResponsiveBigImageArticleUnit = {
    type: ContentBlockType.ResponsiveBigImageArticle,
    id: "123123",
    strapName: "National",
    indexHeadline: "Dummy Headline",
    title: "Title",
    introText: "Dummy intro text",
    linkUrl: "https://dummyurl.com",
    imageSrc: "https://dummyimagesrc.com",
    imageSrcSet: "https://dummyimagesrc.com 1w",
    lastPublishedTime: twoDaysAgoDateInSeconds,
    headlineFlags: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ResponsiveBigImageArticleComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    }).compileComponents();

    analyticsService = TestBed.get(AnalyticsService);
    fixture = TestBed.createComponent(ResponsiveBigImageArticleComponent);
    component = fixture.componentInstance;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("should render input data", () => {
    component.input = articleData;

    fixture.detectChanges();

    const componentElement: HTMLElement = fixture.debugElement.nativeElement;
    const a = componentElement.querySelector("a");

    expect(a!.getAttribute("href")).toEqual(articleData.linkUrl);

    const h3 = componentElement.querySelector("h3");
    expect(h3!.textContent).toEqual(articleData.indexHeadline);

    const img = componentElement.querySelector("img");
    expect(img!.getAttribute("src")).toEqual(articleData.imageSrc);
    expect(img!.getAttribute("srcset")).toEqual(articleData.imageSrcSet);
    expect(img!.getAttribute("alt")).toEqual(articleData.indexHeadline);

    const introSpan = componentElement.querySelector("p span.intro");
    expect(introSpan!.textContent).toEqual("Dummy intro text");
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

  it("should pass correct inputs to headline component", () => {
    articleData.headlineFlags = [HeadlineFlags.PHOTO];
    component.input = articleData;

    fixture.detectChanges();

    const headline = fixture.debugElement.query(By.directive(HeadlineComponent))
      .componentInstance;

    expect(headline).toHaveProperty("headline", articleData.indexHeadline);
    expect(headline).toHaveProperty("headlineFlags", articleData.headlineFlags);
    expect(headline).not.toHaveProperty("timeStamp");
  });
});
