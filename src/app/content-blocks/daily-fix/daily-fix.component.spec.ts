import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By, TransferState } from "@angular/platform-browser";
import { AccentColor } from "../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IDailyFix } from "../../../../common/__types__/IDailyFix";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { DailyFixComponent } from "./daily-fix.component";

describe("DailyFixComponent", () => {
  let component: DailyFixComponent;
  let fixture: ComponentFixture<DailyFixComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;
  const articleContent = (id: number): IHomepageArticleContent => ({
    id: `${id}`,
    headline: `headline ${id}`,
    title: `title ${id}`,
    byline: `BYLINE ${id}`,
    introText: `introText ${id}`,
    linkUrl: `linkUrl/${id}`,
    image: {
      defcon: `defcon${id}jpg`,
      sixteenByNine: `sixteenByNine${id}jpg`
    },
    lastPublishedTime: 123,
    headlineFlags: [],
    color: AccentColor.Gray,
    category: { name: "National", url: "/national/" }
  });

  const input: IDailyFix = {
    type: ContentBlockType.DailyFix,
    articles: [
      articleContent(1),
      articleContent(2),
      articleContent(3),
      articleContent(4)
    ],
    displayName: "daily fix",
    strapName: "dailyFix"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DailyFixComponent],
      providers: [
        TransferState,
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
    fixture = TestBed.createComponent(DailyFixComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    component.input = input;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should render", () => {
    component.input = input;

    fixture.detectChanges();

    const header = fixture.debugElement.query(By.css(".header")).nativeElement;
    expect(header.textContent).toBe(input.displayName);

    const articles = fixture.debugElement.queryAll(By.css("article"));
    expect(articles).toHaveLength(4);
    articles.forEach((article, index) => {
      const headline = article.query(By.css(".headline")).nativeElement;
      const image: HTMLUnknownElement & any = article.query(
        By.css("app-fluid-image")
      ).nativeElement;

      expect(headline.textContent).toBe(input.articles[index].headline);
      expect(image.imageSrc).toBe(input.articles[index].image.sixteenByNine);
      expect(image.caption).toBe(input.articles[index].headline);
    });
  });

  it("should render when there are less than 4 articles", () => {
    component.input = {
      ...input,
      articles: [articleContent(1)]
    };

    fixture.detectChanges();

    const articles = fixture.debugElement.queryAll(By.css("article"));
    expect(articles).toHaveLength(1);
  });

  it("should send analytics when clicking on article", async () => {
    component.input = input;

    fixture.detectChanges();

    const articles = fixture.debugElement.queryAll(By.css("article a"));
    articles.forEach((article, index) => {
      article.nativeElement.click();
      expect(analyticsService.pushEvent).toHaveBeenCalledWith({
        type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
        strapName: input.strapName,
        articleHeadline: input.articles[index].title,
        articleId: input.articles[index].id
      });
    });
  });
});
