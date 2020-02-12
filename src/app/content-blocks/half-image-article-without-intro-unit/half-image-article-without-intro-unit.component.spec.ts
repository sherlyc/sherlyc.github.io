import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HalfImageArticleWithoutIntroUnitComponent } from "./half-image-article-without-intro-unit.component";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { mockService, ServiceMock } from "src/app/services/mocks/MockService";
import { AnalyticsService } from "src/app/services/analytics/analytics.service";
import { FeatureSwitchService } from "../../services/feature-switch/feature-switch.service";
import { IHalfImageArticleWithoutIntroUnit } from "../../../../common/__types__/IHalfImageArticleWithoutIntroUnit";
import { HeadlineComponent } from "../../shared/components/headline/headline.component";
import { By } from "@angular/platform-browser";
import { TimeAgoComponent } from "../../shared/components/time-ago/time-ago.component";
import { FluidImageComponent } from "../../shared/components/fluid-image/fluid-image.component";
import { HeadlineFlagComponent } from "../../shared/components/headline-flag/headline-flag.component";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { SharedModule } from "../../shared/shared.module";
import { Component, Input } from "@angular/core";

describe("HalfImageArticleWithoutIntroUnit", () => {
  let component: HalfImageArticleWithoutIntroUnitComponent;
  let fixture: ComponentFixture<HalfImageArticleWithoutIntroUnitComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const articleData: IHalfImageArticleWithoutIntroUnit = {
    type: ContentBlockType.HalfImageArticleWithoutIntroUnit,
    id: "123123",
    strapName: "National",
    indexHeadline: "Dummy Headline",
    title: "Title Headline",
    linkUrl: "https://dummyurl.com",
    imageSrc: "https://dummyimagesrc.com",
    headlineFlags: [],
    lastPublishedTime: 1
  };

  @Component({
    selector: "app-fluid-image",
    template: ""
  })
  class FakeFluidImageComponent {
    @Input() imageSrc!: string;
    @Input() caption!: string;
  }

  beforeEach(async () =>
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [
        HalfImageArticleWithoutIntroUnitComponent,
        FakeFluidImageComponent
      ],
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
    })
      .overrideComponent(FluidImageComponent, {
        set: {
          selector: "app-fluid-image-original"
        }
      })
      .compileComponents()
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      HalfImageArticleWithoutIntroUnitComponent
    );
    component = fixture.componentInstance;
    analyticsService = TestBed.get(AnalyticsService);
  });

  it("should create", () => {
    component.input = articleData;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should render fluid image component", () => {
    component.input = articleData;

    fixture.detectChanges();

    const componentElement = fixture.debugElement;
    const image: FakeFluidImageComponent = componentElement.query(
      By.directive(FakeFluidImageComponent)
    ).componentInstance;

    expect(image.imageSrc).toEqual(articleData.imageSrc);
    expect(image.caption).toEqual(articleData.indexHeadline);
  });

  it("should render headline component", () => {
    component.input = articleData;

    fixture.detectChanges();

    const componentElement = fixture.debugElement;
    const headline: HeadlineComponent = componentElement.query(
      By.directive(HeadlineComponent)
    ).componentInstance;

    expect(headline.headline).toEqual(articleData.indexHeadline);
    expect(headline.headlineFlags).toEqual(articleData.headlineFlags);
  });

  it("should render time ago component", () => {
    component.input = articleData;

    fixture.detectChanges();

    const componentElement = fixture.debugElement;
    const timeAgo: TimeAgoComponent = componentElement.query(
      By.directive(TimeAgoComponent)
    ).componentInstance;

    expect(timeAgo.timestamp).toEqual(articleData.lastPublishedTime);
    expect(timeAgo.textColor).toEqual("#9a9a9a");
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
});