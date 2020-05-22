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
});
