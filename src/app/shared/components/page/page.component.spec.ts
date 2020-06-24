import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NavigationStart } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of, Subject, throwError } from "rxjs";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { environment } from "../../../../environments/environment";
import { AdService } from "../../../services/ad/ad.service";
import { AnalyticsService } from "../../../services/analytics/analytics.service";
import { ContentRetrieverService } from "../../../services/content-retriever/content-retriever.service";
import { CorrelationService } from "../../../services/correlation/correlation.service";
import { EventsService } from "../../../services/events/events.service";
import { FeatureSwitchService } from "../../../services/feature-switch/feature-switch.service";
import { LoggerService } from "../../../services/logger/logger.service";
import { mockService, ServiceMock } from "../../../services/mocks/MockService";
import { RuntimeService } from "../../../services/runtime/runtime.service";
import { SeoService } from "../../../services/seo/seo.service";
import { PageComponent } from "./page.component";

describe("PageComponent", () => {
  const originalVersion = environment.version;
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  let contentRetrieverMock: ServiceMock<ContentRetrieverService>;
  let adServiceMock: ServiceMock<AdService>;
  let eventsServiceMock: ServiceMock<EventsService>;
  let analyticsServiceMock: ServiceMock<AnalyticsService>;
  let loggerService: ServiceMock<LoggerService>;
  let runtimeService: ServiceMock<RuntimeService>;
  let seoService: ServiceMock<SeoService>;
  let featureSwitchService: ServiceMock<FeatureSwitchService>;

  const mockContentBlocks: IContentBlock[] = ([
    {
      type: "FakeContentBlock"
    },
    {
      type: "FakeContentBlock"
    },
    {
      type: "FakeContentBlock"
    },
    {
      type: "FakeContentBlock"
    },
    {
      type: "FakeContentBlock"
    }
  ] as any) as IContentBlock[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PageComponent],
      providers: [
        {
          provide: ContentRetrieverService,
          useClass: mockService(ContentRetrieverService)
        },
        {
          provide: AdService,
          useClass: mockService(AdService)
        },
        {
          provide: CorrelationService,
          useClass: mockService(CorrelationService)
        },
        {
          provide: EventsService,
          useClass: mockService(EventsService)
        },
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: LoggerService,
          useClass: mockService(LoggerService)
        },
        {
          provide: SeoService,
          useClass: mockService(SeoService)
        },
        {
          provide: FeatureSwitchService,
          useClass: mockService(FeatureSwitchService)
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(PageComponent, {
        set: {
          template: `
            <ng-container *ngFor="let contentBlock of contentBlocks; trackBy: trackByFn">
            <p class="app-fake-content-block"></p>
            </ng-container>`
        }
      })
      .compileComponents();
    eventsServiceMock = TestBed.inject(EventsService) as ServiceMock<
      EventsService
    >;
    eventsServiceMock.getEventSubject.mockReturnValue({
      NavigationStart: new Subject<NavigationStart>()
    });
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    contentRetrieverMock = TestBed.inject(
      ContentRetrieverService
    ) as ServiceMock<ContentRetrieverService>;
    adServiceMock = TestBed.inject(AdService) as ServiceMock<AdService>;
    analyticsServiceMock = TestBed.inject(AnalyticsService) as ServiceMock<
      AnalyticsService
    >;
    loggerService = TestBed.inject(LoggerService) as ServiceMock<LoggerService>;
    runtimeService = TestBed.inject(RuntimeService) as ServiceMock<
      RuntimeService
    >;
    seoService = TestBed.inject(SeoService) as ServiceMock<SeoService>;
    featureSwitchService = TestBed.inject(FeatureSwitchService) as ServiceMock<
      FeatureSwitchService
    >;
    featureSwitchService.getFeatures.mockResolvedValue({
      HomepageV2: true,
      Placeholder: false
    });
    runtimeService.isBrowser.mockReturnValue(true);
  });

  afterEach(() => {
    jest.resetAllMocks();
    environment.version = originalVersion;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    // initial state
    expect(component.contentBlocks).toHaveLength(0);
    expect(
      fixture.debugElement.queryAll(By.css(".app-fake-content-block"))
    ).toHaveLength(0);
  });

  it("should render a list of content block", () => {
    contentRetrieverMock.getContent.mockReturnValue(
      of({
        title: "",
        version: "",
        content: mockContentBlocks,
        apiRequestId: ""
      })
    );

    component.getData();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      assertsForSuccessfulRetrieval();
    });
  });

  it('should render a list of content block when router navigates to "/"', () => {
    contentRetrieverMock.getContent.mockReturnValue(
      of({
        title: "",
        version: "",
        content: mockContentBlocks,
        apiRequestId: ""
      })
    );
    const getDataSpy = jest.spyOn(component, "getData");

    eventsServiceMock
      .getEventSubject()
      .NavigationStart.next(new NavigationStart(0, "/"));
    expect(getDataSpy).not.toHaveBeenCalled();

    fixture.detectChanges();
    expect(getDataSpy).toBeCalledTimes(1);
    expect(contentRetrieverMock.getContent).toBeCalledTimes(1);
    expect(seoService.reset).toBeCalledTimes(1);

    eventsServiceMock
      .getEventSubject()
      .NavigationStart.next(new NavigationStart(0, "/"));
    expect(getDataSpy).toBeCalledTimes(2);
    expect(contentRetrieverMock.getContent).toBeCalledTimes(2);
    expect(seoService.reset).toBeCalledTimes(2);

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      assertsForSuccessfulRetrieval();
    });
  });

  it("should not render any content block when the retriever fails to get content", () => {
    contentRetrieverMock.getContent.mockReturnValue(
      throwError("Something wrong when retrieving the content")
    );

    component.getData();

    assertsForFailedRetrieval();
  });

  it('should not render any content block when router navigates to "/" but the retriever fails to get content', () => {
    contentRetrieverMock.getContent.mockReturnValue(
      throwError("Something wrong when retrieving the content")
    );
    const getDataSpy = jest.spyOn(component, "getData");

    eventsServiceMock
      .getEventSubject()
      .NavigationStart.next(new NavigationStart(0, "/"));
    expect(getDataSpy).not.toHaveBeenCalled();

    fixture.detectChanges();
    expect(getDataSpy).toHaveBeenCalled();
    expect(contentRetrieverMock.getContent).toHaveBeenCalled();

    eventsServiceMock
      .getEventSubject()
      .NavigationStart.next(new NavigationStart(0, "/"));

    assertsForFailedRetrieval();
  });

  it("should notify ad sdk when page finish render", () => {
    contentRetrieverMock.getContent.mockReturnValue(
      of({
        title: "",
        version: "",
        content: mockContentBlocks,
        apiRequestId: ""
      })
    );
    fixture.detectChanges(); // trigger ngInit()

    fixture.whenStable().then(() => {
      expect(adServiceMock.notify).toHaveBeenCalled();
    });
  });

  it("should post nielsen tracking record when the page rendering finishes", () => {
    contentRetrieverMock.getContent.mockReturnValue(
      of({
        title: "",
        version: "",
        content: mockContentBlocks,
        apiRequestId: ""
      })
    );
    fixture.detectChanges(); // trigger ngInit()

    fixture.whenStable().then(() => {
      expect(analyticsServiceMock.trackPageByNielsen).toHaveBeenCalled();
    });
  });

  it("should not render when feature switch is not ready", () => {
    contentRetrieverMock.getContent.mockReturnValue(
      of({
        title: "",
        version: "",
        content: mockContentBlocks,
        apiRequestId: ""
      })
    );
    featureSwitchService.getFeatures.mockRejectedValue("Error");

    component.getData();
    assertsForFailedRetrieval();
  });

  it("should not wait feature switch when run in server side", () => {
    contentRetrieverMock.getContent.mockReturnValue(
      of({
        title: "",
        version: "",
        content: mockContentBlocks,
        apiRequestId: ""
      })
    );
    runtimeService.isBrowser.mockReturnValue(false);

    fixture.detectChanges();

    expect(featureSwitchService.getFeatures).not.toHaveBeenCalled();
  });

  function assertsForSuccessfulRetrieval() {
    expect(component.contentBlocks).toHaveLength(mockContentBlocks.length);
    (component.contentBlocks as Array<{ type: string }>).forEach(
      (contentBlock) => {
        expect(contentBlock.type).toEqual("FakeContentBlock");
      }
    );

    expect(
      fixture.debugElement.queryAll(By.css(".app-fake-content-block"))
    ).toHaveLength(mockContentBlocks.length);
  }

  function assertsForFailedRetrieval() {
    expect(component.contentBlocks).toHaveLength(0);

    expect(
      fixture.debugElement.queryAll(By.css(".app-fake-content-block"))
    ).toHaveLength(0);
  }
});
