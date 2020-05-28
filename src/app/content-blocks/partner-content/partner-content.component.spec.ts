import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PartnerContentComponent } from "./partner-content.component";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { IPartnerContent } from "../../../../common/__types__/IPartnerContent";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { Logo } from "../../../../common/Logo";
import { By } from "@angular/platform-browser";
import { IHomepageArticleContent } from "../../../../common/__types__/IHomepageArticleContent";
import {
  IHomepageArticle,
  Orientation
} from "../../../../common/__types__/IHomepageArticle";

const fakeHomepageArticleContents = (
  ids: number[]
): IHomepageArticleContent[] =>
  ids.map((id) => ({
    id: `${id}`,
    headline: `${id} headline`,
    title: `${id} title`,
    linkUrl: `${id} linkUrl`,
    introText: `${id} introText`,
    headlineFlags: [],
    lastPublishedTime: id,
    byline: `${id} byline`,
    image: {
      defcon: `${id}-defcon.png`,
      sixteenByNine: `${id}-16x9.png`
    }
  }));

const expectedHomepageArticle = (
  strapName: string,
  id: number
): IHomepageArticle => ({
  type: ContentBlockType.HomepageArticle,
  id: `${id}`,
  introText: undefined,
  headline: `${id} headline`,
  linkUrl: `${id} linkUrl`,
  headlineFlags: [],
  lastPublishedTime: id,
  analytics: {
    title: `${id} title`,
    strapName
  },
  imageSrc: `${id}-16x9.png`,
  orientation: {
    mobile: Orientation.Portrait,
    tablet: Orientation.Portrait,
    desktop: Orientation.Portrait
  }
});

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
    const homepageArticles = componentElement.queryAll(
      By.css("app-homepage-article")
    );
    expect(homepageArticles[0].nativeElement.input).toEqual(
      expectedHomepageArticle(partnerContent.strapName, 1)
    );
    expect(homepageArticles[1].nativeElement.input).toEqual(
      expectedHomepageArticle(partnerContent.strapName, 2)
    );
    const bulletItems = componentElement.queryAll(By.css("article a"));

    const bulletListArticles = partnerContent.articles.slice(2);
    bulletItems.forEach((bulletItem, index) => {
      const bulletItemElem: HTMLLinkElement = bulletItem.nativeElement;
      expect(bulletItemElem.getAttribute("href")).toEqual(
        bulletListArticles[index].linkUrl
      );
      expect(bulletItem.nativeElement.appOpenExternalLink).toEqual(
        bulletListArticles[index].linkUrl
      );
      const headline = bulletItemElem.querySelector<HTMLSpanElement>(
        "span:last-child"
      );
      expect(headline!.textContent).toEqual(bulletListArticles[index].headline);
    });

    const logoLink: HTMLLinkElement = componentElement.query(
      By.css("a.logo-link")
    ).nativeElement;
    expect(logoLink.getAttribute("href")).toEqual(partnerContent.logoLink);
    expect(logoLink.getAttribute("aria-label")).toEqual(
      `logo of ${partnerContent.logo}`
    );
    const logo = componentElement.query(By.css("app-logo"));
    expect(logo.nativeElement.name).toEqual(partnerContent.logo);
  });
});
