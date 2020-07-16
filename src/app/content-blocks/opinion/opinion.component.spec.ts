import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AspectRatio } from "../../../../common/AspectRatio";
import { AccentColor } from "../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { IOpinion } from "../../../../common/__types__/IOpinion";
import { Section } from "../../../../server-src/services/section";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { FluidImageComponent } from "../../shared/components/fluid-image/fluid-image.component";
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
      articleContent(4)
    ],
    cartoons: [articleContent(6)],
    strapName: "strapName",
    displayName: "opinion",
    url: "/" + Section.Opinion
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
    expect(header.getAttribute("href")).toBe(input.url);

    const primaryImage: FluidImageComponent = fixture.debugElement.query(
      By.css(".primary app-fluid-image")
    ).nativeElement;
    const primaryByline = fixture.debugElement.query(By.css(".primary .byline"))
      .nativeElement;
    expect(primaryImage.imageSrc).toBe(input.cartoons[0].image.sixteenByNine);
    expect(primaryImage.aspectRatio).toBe(AspectRatio.SixteenByNine);
    expect(primaryImage.caption).toBe(input.cartoons[0].headline);
    expect(primaryByline.textContent).toBe(input.cartoons[0].byline);

    const secondaryImage: FluidImageComponent = fixture.debugElement.query(
      By.css(".secondary app-fluid-image")
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
    expect(secondaryImage.imageSrc).toBe(input.articles[0].image.sixteenByNine);
    expect(secondaryImage.aspectRatio).toBe(AspectRatio.OneByOne);
    expect(secondaryImage.caption).toBe(input.articles[0].headline);
    expect(secondaryImage.disableSmartCrop).toBeTruthy();
    expect(secondaryByline.textContent).toBe(input.articles[0].byline);
    expect(secondaryHeadline.textContent).toBe(input.articles[0].headline);
    expect(secondaryIntro.textContent).toBe(input.articles[0].introText);

    const list = fixture.debugElement.queryAll(By.css(".list article"));
    const listArticles = input.articles.slice(1);
    list.forEach((article, index) => {
      const byline = article.query(By.css(".byline")).nativeElement;
      const headline = article.query(By.css(".headline")).nativeElement;
      const avatar: FluidImageComponent = article.query(
        By.css("app-fluid-image")
      ).nativeElement;

      expect(byline.textContent).toBe(listArticles[index].byline);
      expect(headline.textContent).toBe(listArticles[index].headline);
      expect(avatar.imageSrc).toBe(listArticles[index].image.sixteenByNine);
      expect(avatar.aspectRatio).toBe(AspectRatio.OneByOne);
      expect(avatar.caption).toBe(listArticles[index].headline);
      expect(avatar.disableSmartCrop).toBeTruthy();
    });
  });

  it("should hide primary article when no cartoon is provided", async () => {
    component.input = { ...input, cartoons: [] };

    fixture.detectChanges();

    const primary = fixture.debugElement.query(By.css(".primary article a"));
    expect(primary).toBeFalsy();
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
      articleHeadline: input.cartoons[0].title,
      articleId: input.cartoons[0].id
    });

    const secondaryArticle = componentElement.query(
      By.css(".secondary article a")
    );
    secondaryArticle.nativeElement.click();

    await fixture.whenStable();
    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName: input.strapName,
      articleHeadline: input.articles[0].title,
      articleId: input.articles[0].id
    });

    const listItems = componentElement.queryAll(By.css(".list article a"));
    expect(listItems.length).toEqual(3);
    const listItemArticles = component.input.articles.slice(1);
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
