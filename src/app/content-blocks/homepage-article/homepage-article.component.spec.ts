import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomepageArticleComponent } from "./homepage-article.component";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import {
  IHomepageArticle,
  Orientation
} from "../../../../common/__types__/IHomepageArticle";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";

describe("HomepageArticleComponent", () => {
  let component: HomepageArticleComponent;
  let fixture: ComponentFixture<HomepageArticleComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const articleData: IHomepageArticle = {
    type: ContentBlockType.HomepageArticle,
    id: "123123",
    headline: "Dummy Headline",
    introText: "Dummy intro text",
    linkUrl: "https://dummyurl.com",
    imageSrc: "https://dummyimagesrc.com",
    analytics: {
      strapName: "National",
      title: "Title"
    },
    headlineFlags: [],
    orientation: {
      mobile: Orientation.Portrait,
      tablet: Orientation.Portrait,
      desktop: Orientation.Landscape
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageArticleComponent],
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
    fixture = TestBed.createComponent(HomepageArticleComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
  });

  it("should create", () => {
    component.input = articleData;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should render as per the input data", () => {
    component.input = articleData;
    fixture.detectChanges();

    const componentElement: HTMLElement = fixture.debugElement.nativeElement;
    const a = componentElement.querySelector<HTMLLIElement>("a");

    expect(a!.getAttribute("href")).toEqual(articleData.linkUrl);

    const headline = componentElement.querySelector<HTMLUnknownElement & any>(
      "app-headline"
    );
    expect(headline!.headline).toEqual(articleData.headline);
    expect(headline!.headlineFlags).toEqual(articleData.headlineFlags);

    const img = componentElement.querySelector<HTMLUnknownElement & any>(
      "app-fluid-image"
    );
    expect(img!.imageSrc).toEqual(articleData.imageSrc);
    expect(img!.caption).toEqual(articleData.headline);
    expect(img!.aspectRatio).toEqual("16:9");

    const intro = componentElement.querySelector("p.intro");
    expect(intro!.textContent).toEqual(articleData.introText);
  });

  it.each([
    [
      Orientation.Landscape,
      Orientation.Landscape,
      Orientation.Landscape,
      "landscape-mobile landscape-tablet landscape-desktop"
    ],
    [
      Orientation.Portrait,
      Orientation.Landscape,
      Orientation.Landscape,
      "portrait-mobile landscape-tablet landscape-desktop"
    ],
    [
      Orientation.Landscape,
      Orientation.Portrait,
      Orientation.Landscape,
      "landscape-mobile portrait-tablet landscape-desktop"
    ],
    [
      Orientation.Landscape,
      Orientation.Landscape,
      Orientation.Portrait,
      "landscape-mobile landscape-tablet portrait-desktop"
    ],
    [
      Orientation.Portrait,
      Orientation.Portrait,
      Orientation.Landscape,
      "portrait-mobile portrait-tablet landscape-desktop"
    ],
    [
      Orientation.Portrait,
      Orientation.Landscape,
      Orientation.Portrait,
      "portrait-mobile landscape-tablet portrait-desktop"
    ],
    [
      Orientation.Landscape,
      Orientation.Portrait,
      Orientation.Portrait,
      "landscape-mobile portrait-tablet portrait-desktop"
    ],
    [
      Orientation.Portrait,
      Orientation.Portrait,
      Orientation.Portrait,
      "portrait-mobile portrait-tablet portrait-desktop"
    ]
  ])(
    "should set the class names when expecting %s in mobile, %s in tablet and %s in desktop",
    (mobileOrientation, tabletOrientation, desktopOrientation, classNames) => {
      component.input = {
        ...articleData,
        orientation: {
          mobile: mobileOrientation,
          tablet: tabletOrientation,
          desktop: desktopOrientation
        }
      };
      fixture.detectChanges();

      const componentElement: HTMLElement = fixture.debugElement.nativeElement;
      const a = componentElement.querySelector<HTMLLIElement>("a");
      expect(a!.getAttribute("class")).toEqual(classNames);
    }
  );

  it("should hide image if not available", async () => {
    component.input = { ...articleData, imageSrc: undefined };

    fixture.detectChanges();
    const componentElement: HTMLElement = fixture.debugElement.nativeElement;
    const img = componentElement.querySelector("app-fluid-image");
    expect(img).toBeFalsy();
  });

  it("should hide intro text if not available", async () => {
    component.input = { ...articleData, introText: undefined };

    fixture.detectChanges();
    const componentElement: HTMLElement = fixture.debugElement.nativeElement;
    const intro = componentElement.querySelector("p.intro");
    expect(intro).toBeFalsy();
  });

  it("should send analytics when clicked", () => {
    const { strapName, title } = articleData.analytics;
    component.input = articleData;
    fixture.detectChanges();

    const anchorTag = fixture.debugElement.query(By.css("a")).nativeElement;
    anchorTag.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: title,
      articleId: articleData.id
    });
  });
});
