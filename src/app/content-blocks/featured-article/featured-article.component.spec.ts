import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By, TransferState } from "@angular/platform-browser";
import { Subject } from "rxjs";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IFeaturedArticle } from "../../../../common/__types__/IFeaturedArticle";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { ResizeObserverService } from "../../services/resize-observer/resize-observer.service";
import { SharedModule } from "../../shared/shared.module";
import { FeaturedArticleComponent } from "./featured-article.component";

describe("FeaturedArticleComponent", () => {
  let component: FeaturedArticleComponent;
  let fixture: ComponentFixture<FeaturedArticleComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const articleData: IFeaturedArticle = {
    type: ContentBlockType.FeaturedArticle,
    id: "123123",
    strapName: "National",
    indexHeadline: "Dummy Headline",
    introText: "Dummy intro text",
    title: "Title",
    linkUrl: "https://dummyurl.com",
    imageSrc: "https://dummyimagesrc.com",
    imageSrcSet: "https://dummyimagesrc.com",
    lastPublishedTime: 123123,
    headlineFlags: [],
    boxColor: "red",
    textColor: "white",
    applyGradient: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [FeaturedArticleComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        },
        {
          provide: ResizeObserverService,
          useClass: class {
            observe() {
              return new Subject();
            }
          }
        },
        {
          provide: TransferState,
          useClass: mockService(TransferState)
        }
      ]
    }).compileComponents();

    analyticsService = TestBed.get(AnalyticsService);

    fixture = TestBed.createComponent(FeaturedArticleComponent);
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should send analytics when clicked", () => {
    const { strapName, title, id } = articleData;
    component.input = articleData;
    fixture.detectChanges();

    const anchorTag = fixture.debugElement.query(By.css("a")).nativeElement;
    anchorTag.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: title,
      articleId: id
    });
  });

  it("should set gradient box color and text color when applyGradient is true", () => {
    const boxColor = "white";
    const textColor = "blue";
    component.input = {
      ...articleData,
      boxColor,
      textColor,
      applyGradient: true
    };

    fixture.detectChanges();

    expect(component.boxStyle).toEqual(
      expect.objectContaining({
        "background-image": `linear-gradient(rgba(0,0,0,0) 0%, ${boxColor} 30px, ${boxColor} 100%)`,
        color: textColor
      })
    );
  });

  it("should set solid colour background and text color when applyGradient is false", () => {
    const boxColor = "white";
    const textColor = "green";
    component.input = {
      ...articleData,
      boxColor,
      textColor,
      applyGradient: false
    };

    fixture.detectChanges();

    expect(component.boxStyle).toEqual(
      expect.objectContaining({
        background: boxColor,
        color: textColor
      })
    );
  });

  it("should set pumped class", () => {
    component.input = { ...articleData, pumped: true };
    fixture.detectChanges();

    const host = fixture.debugElement.nativeElement;

    expect(host.className).toMatch(/pumped/);
  });
});
