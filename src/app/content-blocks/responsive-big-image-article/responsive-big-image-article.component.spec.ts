import { Component, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IResponsiveBigImageArticleUnit } from "../../../../common/__types__/IResponsiveBigImageArticleUnit";
import { AnalyticsService } from "../../services/analytics/analytics.service";
import { AnalyticsEventsType } from "../../services/analytics/__types__/AnalyticsEventsType";
import { mockService, ServiceMock } from "../../services/mocks/MockService";
import { FluidImageComponent } from "../../shared/components/fluid-image/fluid-image.component";
import { HeadlineComponent } from "../../shared/components/headline/headline.component";
import { SharedModule } from "../../shared/shared.module";
import { ResponsiveBigImageArticleComponent } from "./responsive-big-image-article.component";

describe("Responsive Big Image Article", () => {
  let fixture: ComponentFixture<ResponsiveBigImageArticleComponent>;
  let component: ResponsiveBigImageArticleComponent;
  let analyticsService: ServiceMock<AnalyticsService>;

  const twoDaysAgoDateInSeconds =
    new Date().setDate(new Date().getDate() - 2) / 1000;
  const articleData: IResponsiveBigImageArticleUnit = {
    type: ContentBlockType.ResponsiveBigImageArticle,
    id: "123123",
    strapName: "National",
    indexHeadline: "Dummy Headline",
    title: "Title",
    introText: "Dummy intro text",
    linkUrl: "https://dummyurl.com",
    imageSrc: "https://dummyimagesrc.com",
    imageSrcSet: "https://dummyimagesrc.com 1w",
    lastPublishedTime: twoDaysAgoDateInSeconds,
    headlineFlags: [],
    identifier: "identify",
    identifierColor: "black"
  };

  @Component({
    selector: "app-fluid-image",
    template: ""
  })
  class FakeFluidImageComponent {
    @Input() imageSrc!: string;
    @Input() caption!: string;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [
        ResponsiveBigImageArticleComponent,
        FakeFluidImageComponent
      ],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    })
      .overrideComponent(FluidImageComponent, {
        set: {
          selector: "app-fluid-image-original"
        }
      })
      .compileComponents();

    analyticsService = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
    fixture = TestBed.createComponent(ResponsiveBigImageArticleComponent);
    component = fixture.componentInstance;
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("should render input data", () => {
    component.input = articleData;

    fixture.detectChanges();

    const componentElement: HTMLElement = fixture.debugElement.nativeElement;
    const a = componentElement.querySelector("a");

    expect(a!.getAttribute("href")).toEqual(articleData.linkUrl);

    const img = fixture.debugElement.query(
      By.directive(FakeFluidImageComponent)
    ).componentInstance;
    expect(img.imageSrc).toBe(articleData.imageSrc);
    expect(img.caption).toBe(articleData.indexHeadline);

    const introSpan = componentElement.querySelector("p span.intro");
    expect(introSpan!.textContent).toEqual("Dummy intro text");
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

  it("should pass correct inputs to headline component", () => {
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

  it("should set pumped class", () => {
    component.input = { ...articleData, pumped: true };
    fixture.detectChanges();

    const host = fixture.debugElement.nativeElement;

    expect(host.className).toMatch(/pumped/);
  });
});
