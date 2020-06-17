import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AnalyticsService } from "src/app/services/analytics/analytics.service";
import { AnalyticsEventsType } from "src/app/services/analytics/__types__/AnalyticsEventsType";
import { mockService, ServiceMock } from "src/app/services/mocks/MockService";
import { SharedModule } from "src/app/shared/shared.module";
import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBasicArticleTitleUnit } from "../../../../common/__types__/IBasicArticleTitleUnit";
import { FeatureSwitchService } from "../../services/feature-switch/feature-switch.service";
import { HeadlineComponent } from "../../shared/components/headline/headline.component";
import { BasicArticleTitleUnitComponent } from "./basic-article-title-unit.component";

describe("BasicArticleTitleUnitComponent", () => {
  let component: BasicArticleTitleUnitComponent;
  let fixture: ComponentFixture<BasicArticleTitleUnitComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;
  const headline = "Headline";
  const headlineFlags = [HeadlineFlags.PHOTO];
  const timeStamp = 1;
  const input: IBasicArticleTitleUnit = {
    type: ContentBlockType.BasicArticleTitleUnit,
    id: "123123123",
    strapName: "Top stories",
    indexHeadline: headline,
    title: "Title",
    linkUrl: "/headline/top-news",
    headlineFlags,
    lastPublishedTime: timeStamp,
    identifier: "identify",
    identifierColor: "black"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [BasicArticleTitleUnitComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        },
        {
          provide: FeatureSwitchService,
          useClass: mockService(FeatureSwitchService)
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(BasicArticleTitleUnitComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("should render headline in headline component with correct inputs", () => {
    component.input = input;
    fixture.detectChanges();

    const headlineComponent: HeadlineComponent = fixture.debugElement.query(
      By.directive(HeadlineComponent)
    ).componentInstance;

    expect(headlineComponent.headline).toEqual(input.indexHeadline);
    expect(headlineComponent.headlineFlags).toEqual(input.headlineFlags);
    expect(headlineComponent.identifier).toEqual(input.identifier);
    expect(headlineComponent.identifierColor).toEqual(input.identifierColor);
    expect(headlineComponent).toHaveProperty("timeStamp", timeStamp);
  });

  it("should render anchor tag with correct linkUrl", () => {
    const linkUrl = "/headline/top-news";
    component.input = {
      type: ContentBlockType.BasicArticleTitleUnit,
      id: "123123123",
      indexHeadline: "Headline",
      title: "Title",
      strapName: "Top stories",
      linkUrl,
      headlineFlags: [],
      lastPublishedTime: 1
    };
    fixture.detectChanges();

    const anchorTag = fixture.debugElement.query(By.css("a")).nativeElement;
    expect(anchorTag.href).toEqual(`http://localhost${linkUrl}`);
  });

  it("should send analytics when clicked", () => {
    const strapName = "National";
    const articleId = "123123123";
    const title = "Title";

    component.input = {
      type: ContentBlockType.BasicArticleTitleUnit,
      id: articleId,
      strapName,
      indexHeadline: "Headline",
      title,
      linkUrl: "/national",
      headlineFlags: [],
      lastPublishedTime: 1
    };
    fixture.detectChanges();

    const anchorTag = fixture.debugElement.query(By.css("a")).nativeElement;
    anchorTag.click();

    expect(analyticsService.pushEvent).toBeCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: title,
      articleId: articleId
    });
  });
});
