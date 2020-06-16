import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MostReadListComponent } from "./most-read-list.component";
import { IMostReadList } from "../../../../common/__types__/IMostReadList";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { By } from "@angular/platform-browser";
import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { HeadlineComponent } from "../../shared/components/headline/headline.component";
import { SharedModule } from "../../shared/shared.module";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { AccentColor } from "../../../../common/__types__/AccentColor";

const componentInput: IMostReadList = {
  type: ContentBlockType.MostReadList,
  articles: [],
  displayName: "most read",
  strapName: "most read",
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
    sixteenByNine: `sixteenByNine1.jpg`,
  },
  lastPublishedTime: 123,
  headlineFlags: [],
  color: AccentColor.Gray,
  category: { name: "National", url: "/national/" },
};

describe("MostReadListComponent", () => {
  let component: MostReadListComponent;
  let fixture: ComponentFixture<MostReadListComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [MostReadListComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService),
        },
      ],
    }).compileComponents();

    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostReadListComponent);
    component = fixture.componentInstance;
    component.input = componentInput;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render 8 articles", () => {
    component.input.articles = [
      { ...fakeArticle, id: "1" },
      { ...fakeArticle, id: "2" },
      { ...fakeArticle, id: "3" },
      { ...fakeArticle, id: "4" },
      { ...fakeArticle, id: "5" },
      { ...fakeArticle, id: "6" },
      { ...fakeArticle, id: "7" },
      { ...fakeArticle, id: "8" },
    ];

    fixture.detectChanges();
    const articles = fixture.debugElement.queryAll(By.css("a"));

    expect(articles.length).toBe(8);
  });

  it("should set link url on anchor", () => {
    const linkUrl = "https://hello.world/";
    const article = { ...fakeArticle, linkUrl };
    component.input = {
      ...componentInput,
      articles: [article],
    };

    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css("a")).nativeElement;

    expect(anchor.href).toBe(linkUrl);
  });

  it("should set headline and flags", () => {
    const article = {
      ...fakeArticle,
      headline: "Hello",
      headlineFlags: [HeadlineFlags.PHOTO, HeadlineFlags.VIDEO],
    };
    component.input.articles = [article];

    fixture.detectChanges();
    const headlineComponent: HeadlineComponent = fixture.debugElement.query(
      By.directive(HeadlineComponent)
    ).componentInstance;

    expect(headlineComponent.headline).toBe(article.headline);
    expect(headlineComponent.headlineFlags).toBe(article.headlineFlags);
  });

  it("should send analytics when article is clicked", () => {
    const input: IMostReadList = {
      ...componentInput,
      articles: [fakeArticle],
      strapName: "StrapName",
    };
    component.input = input;

    fixture.detectChanges();
    const anchor = fixture.debugElement.query(By.css("a")).nativeElement;
    anchor.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName: input.strapName,
      articleHeadline: fakeArticle.title,
      articleId: fakeArticle.id,
    });
  });
});
