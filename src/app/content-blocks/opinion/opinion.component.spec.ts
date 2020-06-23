import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AccentColor } from "../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { IOpinion } from "../../../../common/__types__/IOpinion";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { OpinionComponent } from "./opinion.component";

describe("OpinionComponent", () => {
  let component: OpinionComponent;
  let analyticsService: ServiceMock<AnalyticsService>;
  let fixture: ComponentFixture<OpinionComponent>;

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

  const input: IOpinion = {
    type: ContentBlockType.Opinion,
    articles: [
      articleContent(1),
      articleContent(2),
      articleContent(3),
      articleContent(4),
      articleContent(5)
    ],
    strapName: "strapName",
    displayName: "opinion"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpinionComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
  });

  it("should create", () => {
    component.input = input;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should render", () => {
    component.input = input;

    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css("article"))).toHaveLength(5);

    const header = fixture.debugElement.query(By.css(".header")).nativeElement;
    expect(header.textContent).toBe(input.displayName);

    const primaryImage = fixture.debugElement.query(By.css(".primary .cartoon"))
      .nativeElement;
    const primaryByline = fixture.debugElement.query(By.css(".primary .byline"))
      .nativeElement;
    expect(primaryImage.getAttribute("src")).toBe(
      input.articles[0].image.sixteenByNine
    );
    expect(primaryByline.textContent).toBe(
      input.articles[0].byline?.toLowerCase()
    );

    const secondaryImage = fixture.debugElement.query(
      By.css(".secondary .avatar")
    ).nativeElement;
    const secondaryByline = fixture.debugElement.query(
      By.css(".secondary .byline")
    ).nativeElement;
    const secondaryHeadline = fixture.debugElement.query(
      By.css(".secondary .headline")
    ).nativeElement;
    const secondaryIntro = fixture.debugElement.query(
      By.css(".secondary .intro")
    ).nativeElement;
    expect(secondaryImage.getAttribute("src")).toBe(
      `${input.articles[1].image.sixteenByNine}?format=pjpg&crop=1:1,smart`
    );
    expect(secondaryByline.textContent).toBe(
      input.articles[1].byline?.toLowerCase()
    );
    expect(secondaryHeadline.textContent).toBe(input.articles[1].headline);
    expect(secondaryIntro.textContent).toBe(input.articles[1].introText);

    const list = fixture.debugElement.queryAll(By.css(".list article"));
    const listArticles = input.articles.slice(2);
    list.forEach((article, index) => {
      const byline = article.query(By.css(".byline")).nativeElement;
      const headline = article.query(By.css(".headline")).nativeElement;
      const avatar = article.query(By.css(".avatar")).nativeElement;

      expect(byline.textContent).toBe(
        listArticles[index].byline?.toLowerCase()
      );
      expect(headline.textContent).toBe(listArticles[index].headline);
      expect(avatar.getAttribute("src")).toBe(
        `${listArticles[index].image.sixteenByNine}?format=pjpg&crop=1:1,smart`
      );
    });
  });

  it("should send analytics when clicking on article", async () => {
    component.input = input;

    fixture.detectChanges();
    const componentElement = fixture.debugElement;
    const primaryArticle = componentElement.query(By.css(".primary article a"));
    primaryArticle.nativeElement.click();

    await fixture.whenStable();
    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName: input.strapName,
      articleHeadline: input.articles[0].title,
      articleId: input.articles[0].id
    });

    const secondaryArticle = componentElement.query(
      By.css(".secondary article a")
    );
    secondaryArticle.nativeElement.click();

    await fixture.whenStable();
    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName: input.strapName,
      articleHeadline: input.articles[1].title,
      articleId: input.articles[1].id
    });

    const listItems = componentElement.queryAll(By.css(".list article a"));
    expect(listItems.length).toEqual(3);
    const listItemArticles = component.input.articles.slice(2);
    await Promise.all(
      listItems.map(async (listItem, index) => {
        const listItemElement: HTMLLinkElement = listItem.nativeElement;
        listItemElement.click();

        await fixture.whenStable();
        expect(analyticsService.pushEvent).toHaveBeenCalledWith({
          type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
          strapName: input.strapName,
          articleHeadline: listItemArticles[index].title,
          articleId: listItemArticles[index].id
        });
      })
    );
  });
});
