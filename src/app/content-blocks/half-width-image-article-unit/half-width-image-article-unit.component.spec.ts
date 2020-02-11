import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HalfWidthImageArticleUnitComponent } from "./half-width-image-article-unit.component";
import { IBasicArticleUnit } from "../../../../common/__types__/IBasicArticleUnit";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { AnalyticsService } from "src/app/services/analytics/analytics.service";
import { mockService, ServiceMock } from "src/app/services/mocks/MockService";
import { By } from "@angular/platform-browser";
import { AnalyticsEventsType } from "src/app/services/analytics/__types__/AnalyticsEventsType";
import { FeatureSwitchService } from "../../services/feature-switch/feature-switch.service";
import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { HeadlineComponent } from "../../shared/components/headline/headline.component";
import { FluidImageComponent } from "../../shared/components/fluid-image/fluid-image.component";
import { TimeAgoComponent } from "../../shared/components/time-ago/time-ago.component";
import { OpenExternalLinkDirective } from "../../shared/directives/open-external-link/open-external-link.directive";
import { SharedModule } from "../../shared/shared.module";
import { Component, Input } from "@angular/core";

describe("HalfWidthImageArticleUnitComponent", () => {
  let component: HalfWidthImageArticleUnitComponent;
  let fixture: ComponentFixture<HalfWidthImageArticleUnitComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const twoDaysAgoDateInSeconds =
    new Date().setDate(new Date().getDate() - 2) / 1000;

  const articleData: IBasicArticleUnit = {
    type: ContentBlockType.BasicArticleUnit,
    id: "123123",
    strapName: "National",
    indexHeadline: "Dummy Headline",
    introText: "Dummy intro text",
    title: "Title",
    linkUrl: "https://dummyurl.com",
    imageSrc: "https://dummyimagesrc.com",
    imageSrcSet: "https://dummyimagesrc.com 1w",
    lastPublishedTime: twoDaysAgoDateInSeconds,
    headlineFlags: []
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
    analyticsService = TestBed.get(AnalyticsService);
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
    expect(headline).not.toHaveProperty("timeStamp");
  });

  it("should render time ago component", () => {
    component.input = articleData;

    fixture.detectChanges();

    const timeAgo: TimeAgoComponent = fixture.debugElement.query(
      By.directive(TimeAgoComponent)
    ).componentInstance;
    expect(timeAgo.timestamp).toEqual(articleData.lastPublishedTime);
    expect(timeAgo.textColor).toEqual("#9a9a9a");
  });
});
