import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AspectRatio } from "../../../../common/AspectRatio";
import { AccentColor } from "../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { ISkybox } from "../../../../common/__types__/ISkybox";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { FluidImageComponent } from "../../shared/components/fluid-image/fluid-image.component";
import { SkyboxComponent } from "./skybox.component";

const componentInput: ISkybox = {
  type: ContentBlockType.Skybox,
  articles: [],
  strapName: "sky box"
};

const fakeArticle: IHomepageArticleContent = {
  id: `1`,
  headline: `headline 1`,
  title: `title 1`,
  byline: `byline 1`,
  introText: `introText 1`,
  linkUrl: `linkUrl/1`,
  image: {
    defcon: `defcon1.jpg`,
    sixteenByNine: `sixteenByNine1.jpg`
  },
  lastPublishedTime: 123,
  headlineFlags: [],
  color: AccentColor.Gray,
  category: { name: "National", url: "/national/" }
};

describe("SkyboxComponent", () => {
  let component: SkyboxComponent;
  let fixture: ComponentFixture<SkyboxComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkyboxComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkyboxComponent);
    component = fixture.componentInstance;
    component.input = componentInput;
    fixture.detectChanges();
    const scroller = component.scroller.nativeElement;
    component.scroller.nativeElement.scrollTo = jest.fn();
    component.scroller.nativeElement.getBoundingClientRect = jest.fn();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render 4 articles", () => {
    component.input.articles = [
      { ...fakeArticle, id: "1" },
      { ...fakeArticle, id: "2" },
      { ...fakeArticle, id: "3" },
      { ...fakeArticle, id: "4" }
    ];

    fixture.detectChanges();
    const articles = fixture.debugElement.queryAll(By.css("a"));

    expect(articles.length).toBe(4);
    articles.forEach((article, index) => {
      const articleData = component.input.articles[index];
      const avatar: FluidImageComponent = article.query(
        By.css("app-fluid-image")
      ).nativeElement;
      const byline = article.query(By.css(".byline")).nativeElement;
      const headline = article.query(By.css(".headline")).nativeElement;
      expect(article.nativeElement.getAttribute("href")).toEqual(
        articleData.linkUrl
      );
      expect(byline.textContent).toEqual(articleData.byline);
      expect(headline.textContent).toEqual(articleData.headline);
      expect(avatar.imageSrc).toEqual(articleData.image.sixteenByNine);
      expect(avatar.aspectRatio).toEqual(AspectRatio.OneByOne);
      expect(avatar.caption).toEqual(articleData.headline);
      expect(avatar.smartCrop).toBeFalsy();
    });
  });

  it("should send analytics when article is clicked", () => {
    const input: ISkybox = {
      ...componentInput,
      articles: [fakeArticle],
      strapName: "Skybox"
    };
    component.input = input;

    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css("a")).nativeElement;
    anchor.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName: input.strapName,
      articleHeadline: fakeArticle.title,
      articleId: fakeArticle.id
    });
  });

  it("left button should be inactive and right button should be active at the start of scroller", () => {
    component.input.articles = [
      { ...fakeArticle, id: "1" },
      { ...fakeArticle, id: "2" },
      { ...fakeArticle, id: "3" },
      { ...fakeArticle, id: "4" }
    ];

    fixture.detectChanges();
    const leftButton = fixture.debugElement.query(By.css(".left-button"))
      .nativeElement;
    const rightButton = fixture.debugElement.query(By.css(".right-button"))
      .nativeElement;
    expect(leftButton.classList.contains("inactive")).toBeTruthy();
    expect(rightButton.classList.contains("active")).toBeTruthy();
  });

  it("should scroll right when right button is clicked", () => {
    component.input.articles = [
      { ...fakeArticle, id: "1" },
      { ...fakeArticle, id: "2" },
      { ...fakeArticle, id: "3" },
      { ...fakeArticle, id: "4" }
    ];

    fixture.detectChanges();

    const rightButton = fixture.debugElement.query(By.css(".right-button"))
      .nativeElement;
    component.scroller.nativeElement.getBoundingClientRect.mockReturnValue({
      width: 250
    });

    rightButton.click();
    expect(component.scroller.nativeElement.scrollTo).toHaveBeenCalledWith({
      behavior: "smooth",
      left: 250
    });
  });

  it("should scroll left when left button is clicked", () => {
    component.input.articles = [
      { ...fakeArticle, id: "1" },
      { ...fakeArticle, id: "2" },
      { ...fakeArticle, id: "3" },
      { ...fakeArticle, id: "4" }
    ];

    fixture.detectChanges();

    const leftButton = fixture.debugElement.query(By.css(".left-button"))
      .nativeElement;
    component.scroller.nativeElement.getBoundingClientRect.mockReturnValue({
      width: 300
    });

    leftButton.click();
    expect(component.scroller.nativeElement.scrollTo).toHaveBeenCalledWith({
      behavior: "smooth",
      left: -300
    });
  });
});
