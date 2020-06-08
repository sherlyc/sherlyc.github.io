import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AccentColor } from "../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import {
  HomepageFeaturedArticleVariation,
  IHomepageFeaturedArticle
} from "../../../../common/__types__/IHomepageFeaturedArticle";
import { AspectRatio } from "../../../../common/AspectRatio";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { FluidImageComponent } from "../../shared/components/fluid-image/fluid-image.component";
import { HeadlineComponent } from "../../shared/components/headline/headline.component";
import { TagLinkComponent } from "../../shared/components/tag-link/tag-link.component";
import { HomepageFeaturedArticleComponent } from "./homepage-featured-article.component";

describe("HomepageFeaturedArticleComponent", () => {
  let component: HomepageFeaturedArticleComponent;
  let fixture: ComponentFixture<HomepageFeaturedArticleComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const input: IHomepageFeaturedArticle = {
    type: ContentBlockType.HomepageFeaturedArticle,
    id: "123123",
    headline: "Dummy Headline",
    introText: "Dummy intro text",
    linkUrl: "https://dummyurl.com",
    lastPublishedTime: 1,
    color: AccentColor.TopStoriesBlue,
    image: {
      mobile: {
        src: "https://dummyimagesrc.com/16:9.jpg",
        aspectRatio: AspectRatio.SixteenByNine
      }
    },
    category: {
      name: "Category name",
      url: "/categoryurl"
    },
    headlineFlags: [],
    analytics: {
      title: "title",
      strapName: "strapName"
    },
    variation: HomepageFeaturedArticleVariation.Lead
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageFeaturedArticleComponent],
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
    fixture = TestBed.createComponent(HomepageFeaturedArticleComponent);
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

  it("should render as per input", () => {
    component.input = input;
    fixture.detectChanges();

    const image: FluidImageComponent = fixture.debugElement.query(
      By.css("app-fluid-image")
    ).nativeElement;
    expect(image.imageSrc).toEqual(input.image.mobile?.src);
    expect(image.aspectRatio).toEqual(input.image.mobile?.aspectRatio);
    expect(image.caption).toEqual(input.headline);

    const tagLink: TagLinkComponent = fixture.debugElement.query(
      By.css("app-tag-link")
    ).nativeElement;
    expect(tagLink.color).toBe(input.color);
    expect(tagLink.name).toBe(input.category.name);
    expect(tagLink.url).toBe(input.category.url);

    const headline: HeadlineComponent = fixture.debugElement.query(
      By.css("app-headline")
    ).nativeElement;
    expect(headline.headline).toEqual(input.headline);
    expect(headline.headlineFlags).toEqual(input.headlineFlags);

    const intro = fixture.debugElement.query(By.css(".intro")).nativeElement;
    expect(intro.textContent).toEqual(input.introText);
  });

  it.each`
    variation
    ${HomepageFeaturedArticleVariation.Lead}
    ${HomepageFeaturedArticleVariation.Featured}
  `("should set class name for variation $variation", ({ variation }) => {
    component.input = {
      ...input,
      variation
    };

    fixture.detectChanges();
    const wrapper = fixture.debugElement.query(
      By.css(`.variation-${variation.toLowerCase()}`)
    );

    expect(wrapper).toBeTruthy();
  });

  it("should send analytics when clicked", () => {
    const { strapName, title } = input.analytics;
    component.input = input;

    fixture.detectChanges();

    const anchorTag = fixture.debugElement.query(By.css("a")).nativeElement;
    anchorTag.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: title,
      articleId: input.id
    });
  });
});
