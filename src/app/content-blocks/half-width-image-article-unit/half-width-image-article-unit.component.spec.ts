import { Component, Input } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AnalyticsService } from "src/app/services/analytics/analytics.service";
import { AnalyticsEventsType } from "src/app/services/analytics/__types__/AnalyticsEventsType";
import { mockService, ServiceMock } from "src/app/services/mocks/MockService";
import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IHalfWidthImageArticleUnit } from "../../../../common/__types__/IHalfWidthImageArticleUnit";
import { FeatureSwitchService } from "../../services/feature-switch/feature-switch.service";
import { FluidImageComponent } from "../../shared/components/fluid-image/fluid-image.component";
import { HeadlineComponent } from "../../shared/components/headline/headline.component";
import { TimeComponent } from "../../shared/components/time/time.component";
import { SharedModule } from "../../shared/shared.module";
import { HalfWidthImageArticleUnitComponent } from "./half-width-image-article-unit.component";

describe("HalfWidthImageArticleUnitComponent", () => {
  let component: HalfWidthImageArticleUnitComponent;
  let fixture: ComponentFixture<HalfWidthImageArticleUnitComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const twoDaysAgoDateInSeconds =
    new Date().setDate(new Date().getDate() - 2) / 1000;

  const articleData: IHalfWidthImageArticleUnit = {
    type: ContentBlockType.HalfWidthImageArticleUnit,
    id: "123123",
    strapName: "National",
    indexHeadline: "Dummy Headline",
    introText: "Dummy intro text",
    title: "Title",
    linkUrl: "https://dummyurl.com",
    imageSrc: "https://dummyimagesrc.com",
    imageSrcSet: "https://dummyimagesrc.com 1w",
    lastPublishedTime: twoDaysAgoDateInSeconds,
    headlineFlags: [],
    identifier: "Identifier",
    identifierColor: "blue"
  };

  @Component({
    selector: "app-fluid-image",
    template: ""
  })
  class FakeFluidImageComponent {
    @Input() imageSrc!: string;
    @Input() caption!: string;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [
        HalfWidthImageArticleUnitComponent,
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
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HalfWidthImageArticleUnitComponent);
    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
    component = fixture.componentInstance;
  });

  it("should create", () => {
    component.input = articleData;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should render input data", async () => {
    component.input = articleData;

    fixture.detectChanges();

    const componentElement: HTMLElement = fixture.debugElement.nativeElement;
    const a = componentElement.querySelector("a");
    expect(a!.getAttribute("href")).toEqual(articleData.linkUrl);

    const introSpan = componentElement.querySelector("p.intro");
    expect(introSpan!.textContent).toEqual("Dummy intro text");
  });

  it("should render fluid image", async () => {
    component.input = articleData;

    fixture.detectChanges();

    const componentElement = fixture.debugElement;

    const image: FakeFluidImageComponent = componentElement.query(
      By.directive(FakeFluidImageComponent)
    ).componentInstance;

    expect(image.imageSrc).toEqual(articleData.imageSrc);
    expect(image.caption).toEqual(articleData.indexHeadline);
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

  it("should render headline component", () => {
    articleData.headlineFlags = [HeadlineFlags.PHOTO];
    component.input = articleData;

    fixture.detectChanges();

    const headline: HeadlineComponent = fixture.debugElement.query(
      By.directive(HeadlineComponent)
    ).componentInstance;

    expect(headline.headline).toEqual(articleData.indexHeadline);
    expect(headline.headlineFlags).toEqual(articleData.headlineFlags);
    expect(headline.identifier).toEqual(articleData.identifier);
    expect(headline.identifierColor).toEqual(articleData.identifierColor);
    expect(headline).not.toHaveProperty("timeStamp");
  });

  it("should render time component", () => {
    component.input = articleData;

    fixture.detectChanges();

    const time: TimeComponent = fixture.debugElement.query(
      By.directive(TimeComponent)
    ).componentInstance;
    expect(time.timestamp).toEqual(articleData.lastPublishedTime);
    expect(time.textColor).toEqual("#616161");
  });
});
