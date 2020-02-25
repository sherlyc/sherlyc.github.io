import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SharedModule } from "src/app/shared/shared.module";
import { AnalyticsService } from "src/app/services/analytics/analytics.service";
import { mockService, ServiceMock } from "src/app/services/mocks/MockService";
import { FeatureSwitchService } from "../../services/feature-switch/feature-switch.service";
import { ArticleTitleComponent } from "./article-title.component";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IArticleTitle } from "../../../../common/__types__/IArticleTitle";
import { By } from "@angular/platform-browser";
import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { LogoComponent } from "../../shared/components/logo/logo.component";
import { HeadlineFlagComponent } from "../../shared/components/headline-flag/headline-flag.component";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";

describe("ArticleTitle", () => {
  let component: ArticleTitleComponent;
  let fixture: ComponentFixture<ArticleTitleComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const input: IArticleTitle = {
    type: ContentBlockType.ArticleTitle,
    title: "Title",
    indexHeadline: "Index headline",
    id: "1",
    showTimestamp: true,
    strapName: "strap",
    headlineFlags: [],
    lastPublishedTime: 1,
    linkUrl: "https://example.com",
    position: "01"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ArticleTitleComponent],
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
    fixture = TestBed.createComponent(ArticleTitleComponent);
    component = fixture.componentInstance;
    component.input = input;
    analyticsService = TestBed.get(AnalyticsService);
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("should show position when provided", () => {
    component.input = { ...input, position: "01" };
    fixture.detectChanges();

    const position = fixture.debugElement.query(By.css(".position"))
      .nativeElement;

    expect(position).toBeTruthy();
    expect(position.textContent).toContain("01");
  });

  it("should hide position when not provided", () => {
    component.input = { ...input, position: undefined };
    fixture.detectChanges();

    const position = fixture.debugElement.query(By.css(".position"));

    expect(position).toBeFalsy();
  });

  it("should show timestamp when provided", () => {
    const threePm = 1581732000;
    component.input = {
      ...input,
      showTimestamp: true,
      lastPublishedTime: threePm
    };
    fixture.detectChanges();

    const timestamp = fixture.debugElement.query(By.css(".timestamp"));

    expect(timestamp).toBeTruthy();
    expect(timestamp.nativeElement.textContent).toEqual("3:00 PM");
  });

  it("should hide timestamp when not provided", () => {
    component.input = { ...input, showTimestamp: false };
    fixture.detectChanges();

    const timestamp = fixture.debugElement.query(By.css(".timestamp"));

    expect(timestamp).toBeFalsy();
  });

  it("should render indexHeadline", () => {
    const indexHeadline = "A headline";
    component.input = { ...input, indexHeadline };
    fixture.detectChanges();

    const headline = fixture.debugElement.query(By.css(".headline"));

    expect(headline).toBeTruthy();
    expect(headline.nativeElement.textContent).toEqual(indexHeadline);
  });

  it("should render headline flags", () => {
    const headlineFlags = [HeadlineFlags.ADVERTISEMENT];
    component.input = {
      ...input,
      headlineFlags
    };
    fixture.detectChanges();

    const headlineFlagComponent: HeadlineFlagComponent = fixture.debugElement.query(
      By.directive(HeadlineFlagComponent)
    ).componentInstance;

    expect(headlineFlagComponent.flag).toEqual(HeadlineFlags.ADVERTISEMENT);
  });

  it("should send analytics when clicked", () => {
    const strapName = "National";
    component.input = { ...input, strapName };
    fixture.detectChanges();

    const anchorTag = fixture.debugElement.query(By.css("a")).nativeElement;
    anchorTag.click();

    expect(analyticsService.pushEvent).toBeCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: input.title,
      articleId: input.id
    });
  });
});
