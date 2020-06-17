import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DefconComponent } from "./defcon.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { IDefcon } from "../../../../common/__types__/IDefcon";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { AccentColor } from "../../../../common/__types__/AccentColor";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { By } from "@angular/platform-browser";
import { FluidImageComponent } from "../../shared/components/fluid-image/fluid-image.component";
import { TagLinkComponent } from "../../shared/components/tag-link/tag-link.component";
import { HeadlineComponent } from "../../shared/components/headline/headline.component";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { AnalyticsService } from "../../services/analytics/analytics.service";

const fakeHomepageArticleContents = (
  ids: number[]
): IHomepageArticleContent[] =>
  ids.map((id) => ({
    id: `${id}`,
    headline: `${id} headline`,
    color: AccentColor.CuriousBlue,
    title: `${id} title`,
    linkUrl: `${id} linkUrl`,
    introText: `${id} introText`,
    headlineFlags: [],
    lastPublishedTime: id,
    byline: `${id} byline`,
    image: {
      defcon: `${id}-defcon.png`,
      sixteenByNine: `${id}-16x9.png`,
    },
    category: {
      name: "National",
      url: "/national/",
    },
  }));

describe("DefconComponent", () => {
  let component: DefconComponent;
  let fixture: ComponentFixture<DefconComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;
  const defcon: IDefcon = {
    type: ContentBlockType.Defcon,
    articles: fakeHomepageArticleContents([1, 2, 3, 4]),
    color: AccentColor.AppleGreen,
    strapName: "Defcon",
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefconComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefconComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    component.input = defcon;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should render defcon article and related articles", () => {
    component.input = defcon;
    fixture.detectChanges();

    const componentElement = fixture.debugElement;
    const defconAnchor: HTMLAnchorElement = componentElement.query(
      By.css("article a")
    ).nativeElement;
    expect(defconAnchor.getAttribute("href")).toEqual(
      defcon.articles[0].linkUrl
    );

    const defconImage: FluidImageComponent = componentElement.query(
      By.css("article app-fluid-image")
    ).nativeElement;
    expect(defconImage.imageSrc).toEqual(defcon.articles[0].image.defcon);
    expect(defconImage.caption).toEqual(defcon.articles[0].headline);
    expect(defconImage.aspectRatio).toEqual("16:9");

    const defconTagLink: TagLinkComponent = componentElement.query(
      By.css("article app-tag-link")
    ).nativeElement;
    expect(defconTagLink.color).toEqual(defcon.color);
    expect(defconTagLink.name).toEqual(defcon.articles[0].category.name);
    expect(defconTagLink.url).toEqual(defcon.articles[0].category.url);

    const defconHeadline: HeadlineComponent = componentElement.query(
      By.css("article app-headline")
    ).nativeElement;
    expect(defconHeadline.headline).toEqual(defcon.articles[0].headline);
    expect(defconHeadline.headlineFlags).toEqual(
      defcon.articles[0].headlineFlags
    );

    const defconIntro: HTMLParagraphElement = componentElement.query(
      By.css("article .intro")
    ).nativeElement;
    expect(defconIntro.textContent).toEqual(defcon.articles[0].introText);

    const relatedArticles = defcon.articles.slice(1);
    const relatedArticleHeadlines = componentElement.queryAll(
      By.css(".related-articles app-headline")
    );
    expect(relatedArticleHeadlines.length).toEqual(relatedArticles.length);
    relatedArticleHeadlines.forEach((headline, index) => {
      const relatedArticleHeadline: HeadlineComponent = headline.nativeElement;
      expect(relatedArticleHeadline.headline).toEqual(
        relatedArticles[index].headline
      );
      expect(relatedArticleHeadline.headlineFlags).toEqual(
        relatedArticles[index].headlineFlags
      );
    });
  });

  it("should not render related articles when only one defcon article is provided", () => {
    component.input = { ...defcon, articles: fakeHomepageArticleContents([1]) };

    const componentElement = fixture.debugElement;
    const relatedArticles = componentElement.query(By.css(".related-articles"));
    expect(relatedArticles).toBeFalsy();
  });

  it("should send the analytic event when clicking an article link", async () => {
    component.input = defcon;
    fixture.detectChanges();

    const componentElement = fixture.debugElement;

    const defconAnchor: HTMLAnchorElement = componentElement.query(
      By.css("article a")
    ).nativeElement;
    defconAnchor.click();
    await fixture.whenStable();
    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName: defcon.strapName,
      articleHeadline: defcon.articles[0].title,
      articleId: defcon.articles[0].id,
    });

    const relatedArticleLinks = componentElement.queryAll(
      By.css(".related-articles a")
    );
    const relatedArticles = defcon.articles.slice(1);
    await Promise.all(
      relatedArticleLinks.map(async (relatedArticleLink, index) => {
        const relatedArticleAnchor: HTMLAnchorElement =
          relatedArticleLink.nativeElement;
        relatedArticleAnchor.click();

        await fixture.whenStable();
        expect(analyticsService.pushEvent).toHaveBeenCalledWith({
          type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
          strapName: defcon.strapName,
          articleHeadline: relatedArticles[index].title,
          articleId: relatedArticles[index].id,
        });
      })
    );
  });
});
