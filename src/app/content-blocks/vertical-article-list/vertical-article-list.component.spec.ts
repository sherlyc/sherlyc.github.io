import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { VerticalArticleListComponent } from "./vertical-article-list.component";
import { IVerticalArticleList } from "../../../../common/__types__/IVerticalArticleList";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { By } from "@angular/platform-browser";
import { getUnixTime } from "date-fns";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { HeadlineComponent } from "../../shared/components/headline/headline.component";
import { SharedModule } from "../../shared/shared.module";

describe("VerticalArticleListComponent", () => {
  let component: VerticalArticleListComponent;
  let fixture: ComponentFixture<VerticalArticleListComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const componentInput: IVerticalArticleList = {
    type: ContentBlockType.VerticalArticleList,
    articles: [],
    color: "red",
    displayName: "Latest Headline",
    strapName: "Latest Headline"
  };

  const fakeArticleContent = {
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
    category: "National",
    categoryUrl: "/coronavirus/"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [VerticalArticleListComponent],
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
    fixture = TestBed.createComponent(VerticalArticleListComponent);
    component = fixture.componentInstance;
    component.input = componentInput;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render input articles", () => {
    component.input.articles = [
      { ...fakeArticleContent, id: "1" },
      { ...fakeArticleContent, id: "2" },
      { ...fakeArticleContent, id: "3" }
    ];

    fixture.detectChanges();
    const articles = fixture.debugElement.queryAll(By.css("a"));

    expect(articles.length).toBe(3);
  });

  it("should set link url on anchor", () => {
    const linkUrl = "https://hello.world/";
    const fakeArticle = { ...fakeArticleContent, linkUrl };
    component.input = {
      ...componentInput,
      articles: [fakeArticle]
    };

    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css("a")).nativeElement;

    expect(anchor.href).toBe(linkUrl);
  });

  it("should set headline and flags", () => {
    const fakeArticle = {
      ...fakeArticleContent,
      headline: "Hello",
      headlineFlags: [HeadlineFlags.PHOTO, HeadlineFlags.VIDEO]
    };
    component.input.articles = [fakeArticle];

    fixture.detectChanges();
    const headlineComponent: HeadlineComponent = fixture.debugElement.query(
      By.directive(HeadlineComponent)
    ).componentInstance;

    expect(headlineComponent.headline).toBe(fakeArticle.headline);
    expect(headlineComponent.headlineFlags).toBe(fakeArticle.headlineFlags);
  });

  it("should render display name", () => {
    const displayName = "Hello";
    component.input.displayName = displayName;

    fixture.detectChanges();
    const headline = fixture.debugElement.query(By.css("h3")).nativeElement;

    expect(headline.textContent).toBe(displayName);
  });

  it("should render published time as timestamp", () => {
    const fakeArticle = {
      ...fakeArticleContent,
      lastPublishedTime: getUnixTime(new Date("January 01, 2020 10:00:00"))
    };
    component.input.articles = [fakeArticle];

    fixture.detectChanges();
    const timestamp = fixture.debugElement.query(By.css(".time"));

    expect(timestamp.nativeElement.textContent).toBe("10:00am");
  });

  it("should set input color on headline and bullet", () => {
    const color = "red";
    component.input = {
      ...componentInput,
      articles: [fakeArticleContent],
      color
    };

    fixture.detectChanges();
    const headline = fixture.debugElement.query(By.css("h3"));
    const bullet = fixture.debugElement.query(By.css(".bullet"));

    expect(headline.styles.color).toBe(color);
    expect(bullet.styles.background).toBe(color);
    expect(bullet.styles["box-shadow"]).toContain(color);
  });

  it("should send analytics when article is clicked", () => {
    const input: IVerticalArticleList = {
      ...componentInput,
      articles: [fakeArticleContent],
      strapName: "StrapName"
    };
    component.input = input;

    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css("a")).nativeElement;
    anchor.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName: input.strapName,
      articleHeadline: fakeArticleContent.title,
      articleId: fakeArticleContent.id
    });
  });
});
