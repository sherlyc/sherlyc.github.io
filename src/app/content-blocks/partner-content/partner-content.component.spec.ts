import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Logo } from "../../../../common/Logo";
import { AccentColor } from "../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import { IPartnerContent } from "../../../../common/__types__/IPartnerContent";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { mockService, ServiceMock } from "../../services/mocks/MockService";

import { PartnerContentComponent } from "./partner-content.component";

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
      sixteenByNine: `${id}-16x9.png`
    },
    category: {
      name: "National",
      url: "/national/"
    }
  }));

describe("PartnerContentComponent", () => {
  let component: PartnerContentComponent;
  let fixture: ComponentFixture<PartnerContentComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;
  const partnerContent: IPartnerContent = {
    type: ContentBlockType.PartnerContent,
    strapName: "national",
    logo: Logo.DominionPost,
    logoLink: "/",
    articles: fakeHomepageArticleContents([1, 2, 3, 4, 5])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [PartnerContentComponent],
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
    fixture = TestBed.createComponent(PartnerContentComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render", () => {
    component.input = partnerContent;
    fixture.detectChanges();

    const componentElement = fixture.debugElement;
    const homepageArticleElements = componentElement.queryAll(
      By.css("app-homepage-article")
    );
    const homepageArticles = component.homepageArticles;
    homepageArticleElements.forEach((homepageArticleElem, index) => {
      expect(homepageArticleElem.nativeElement.input).toEqual(
        homepageArticles[index]
      );
    });

    const bulletItems = componentElement.queryAll(By.css("article a"));

    const bulletListArticleContents = component.bulletList;
    bulletItems.forEach((bulletItem, index) => {
      const bulletItemElem: HTMLLinkElement = bulletItem.nativeElement;
      expect(bulletItemElem.getAttribute("href")).toEqual(
        bulletListArticleContents[index].linkUrl
      );
      expect(bulletItem.nativeElement.appOpenExternalLink).toEqual(
        bulletListArticleContents[index].linkUrl
      );
      const headline = bulletItemElem.querySelector<HTMLSpanElement>(
        "span:last-child"
      );
      expect(headline!.textContent).toEqual(
        bulletListArticleContents[index].headline
      );
    });

    const logoLink: HTMLLinkElement = componentElement.query(By.css(".logo a"))
      .nativeElement;
    expect(logoLink.getAttribute("href")).toEqual(partnerContent.logoLink);
    expect(logoLink.getAttribute("aria-label")).toEqual(
      `logo of ${partnerContent.logo}`
    );
    const logoElement = componentElement.query(By.css("app-logo"));
    expect(logoElement.nativeElement.name).toEqual(partnerContent.logo);
  });

  it("should render no article but render the logo when feeding empty articles", async () => {
    component.input = { ...partnerContent, articles: [] };

    fixture.detectChanges();

    const componentElement = fixture.debugElement;
    const homepageArticles = componentElement.queryAll(
      By.css("app-homepage-article")
    );
    expect(homepageArticles).toHaveLength(0);
    const bulletListArticles = componentElement.queryAll(By.css("article"));
    expect(bulletListArticles).toHaveLength(0);
    const logo = componentElement.query(By.css("app-logo"));
    expect(logo.nativeElement.name).toEqual(partnerContent.logo);
  });

  it("should send the analytic event when clicking a bullet article link", async () => {
    component.input = partnerContent;
    fixture.detectChanges();

    const componentElement = fixture.debugElement;
    const bulletItems = componentElement.queryAll(By.css("article a"));
    const bulletListArticles = component.bulletList;
    await Promise.all(
      bulletItems.map(async (bulletItem, index) => {
        const bulletItemElem: HTMLLinkElement = bulletItem.nativeElement;
        bulletItemElem.click();

        await fixture.whenStable();
        expect(analyticsService.pushEvent).toHaveBeenCalledWith({
          type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
          strapName: partnerContent.strapName,
          articleHeadline: bulletListArticles[index].title,
          articleId: bulletListArticles[index].id
        });
      })
    );
  });
});
