import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageComponent } from './page.component';
import { ContentRetrieverService } from '../../../services/content-retriever/content-retriever.service';
import { of, throwError, Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationStart } from '@angular/router';
import { IContentBlock } from '../../../../../common/__types__/IContentBlock';
import { mockService, ServiceMock } from '../../../services/mocks/MockService';
import { AdService } from '../../../services/ad/ad.service';
import { CorrelationService } from '../../../services/correlation/correlation.service';
import { EventsService } from '../../../services/events/events.service';
import { AnalyticsService } from '../../../services/analytics/analytics.service';
import { LoggerService } from '../../../services/logger/logger.service';
import { environment } from '../../../../environments/environment';
import { RuntimeService } from '../../../services/runtime/runtime.service';

describe('PageComponent', () => {
  const originalVersion = environment.version;
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  let contentRetrieverMock: ServiceMock<ContentRetrieverService>;
  let adServiceMock: ServiceMock<AdService>;
  let eventsServiceMock: ServiceMock<EventsService>;
  let analyticsServiceMock: ServiceMock<AnalyticsService>;
  let loggerService: ServiceMock<LoggerService>;
  let runtimeService: ServiceMock<RuntimeService>;

  const mockContentBlocks: IContentBlock[] = ([
    {
      type: 'FakeContentBlock'
    },
    {
      type: 'FakeContentBlock'
    },
    {
      type: 'FakeContentBlock'
    },
    {
      type: 'FakeContentBlock'
    },
    {
      type: 'FakeContentBlock'
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
    eventsServiceMock = TestBed.get(EventsService);
    eventsServiceMock.getEventSubject.mockReturnValue({
      NavigationStart: new Subject<NavigationStart>()
    });
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    contentRetrieverMock = TestBed.get(ContentRetrieverService);
    adServiceMock = TestBed.get(AdService);
    analyticsServiceMock = TestBed.get(AnalyticsService);
    loggerService = TestBed.get(LoggerService);
    runtimeService = TestBed.get(RuntimeService);
  });

  afterEach(() => {
    jest.resetAllMocks();
    environment.version = originalVersion;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // initial state
    expect(component.contentBlocks).toHaveLength(0);
    expect(
      fixture.debugElement.queryAll(By.css('.app-fake-content-block'))
    ).toHaveLength(0);
  });

  it('should render a list of content block', () => {
    contentRetrieverMock.getContent.mockReturnValue(
      of({
        title: '',
        version: '',
        content: mockContentBlocks,
        apiRequestId: ''
      })
    );

    component.getData();

    fixture.detectChanges();

    assertsForSuccessfulRetrieval();
  });

  it('should render a list of content block when router navigates to "/"', () => {
    contentRetrieverMock.getContent.mockReturnValue(
      of({
        title: '',
        version: '',
        content: mockContentBlocks,
        apiRequestId: ''
      })
    );
    const getDataSpy = jest.spyOn(component, 'getData');

    eventsServiceMock
      .getEventSubject()
      .NavigationStart.next(new NavigationStart(0, '/'));
    expect(getDataSpy).not.toHaveBeenCalled();

    fixture.detectChanges();
    expect(getDataSpy).toBeCalledTimes(1);
    expect(contentRetrieverMock.getContent).toBeCalledTimes(1);

    eventsServiceMock
      .getEventSubject()
      .NavigationStart.next(new NavigationStart(0, '/'));
    expect(getDataSpy).toBeCalledTimes(2);
    expect(contentRetrieverMock.getContent).toBeCalledTimes(2);
    fixture.detectChanges();

    assertsForSuccessfulRetrieval();
  });

  it('should not render any content block when the retriever fails to get content', () => {
    contentRetrieverMock.getContent.mockReturnValue(
      throwError('Something wrong when retrieving the content')
    );

    component.getData();

    assertsForFailedRetrieval();
  });

  it('should not render any content block when router navigates to "/" but the retriever fails to get content', () => {
    contentRetrieverMock.getContent.mockReturnValue(
      throwError('Something wrong when retrieving the content')
    );
    const getDataSpy = jest.spyOn(component, 'getData');

    eventsServiceMock
      .getEventSubject()
      .NavigationStart.next(new NavigationStart(0, '/'));
    expect(getDataSpy).not.toHaveBeenCalled();

    fixture.detectChanges();
    expect(getDataSpy).toHaveBeenCalled();
    expect(contentRetrieverMock.getContent).toHaveBeenCalled();

    eventsServiceMock
      .getEventSubject()
      .NavigationStart.next(new NavigationStart(0, '/'));

    assertsForFailedRetrieval();
  });

  it('should notify ad sdk when page finish render', () => {
    contentRetrieverMock.getContent.mockReturnValue(
      of({
        title: '',
        version: '',
        content: mockContentBlocks,
        apiRequestId: ''
      })
    );
    fixture.detectChanges();

    expect(adServiceMock.notify).toHaveBeenCalled();
  });

  it('should post nielsen tracking record when the page rendering finishes', () => {
    contentRetrieverMock.getContent.mockReturnValue(
      of({
        title: '',
        version: '',
        content: mockContentBlocks,
        apiRequestId: ''
      })
    );
    fixture.detectChanges();

    expect(analyticsServiceMock.trackPageByNielsen).toHaveBeenCalled();
  });

  it('should log version mismatch in browser', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    environment.version = '13jkhjh3';
    contentRetrieverMock.getContent.mockReturnValue(
      of({
        title: '',
        version: '123',
        content: mockContentBlocks,
        apiRequestId: ''
      })
    );
    fixture.detectChanges();
    expect(loggerService.error).toHaveBeenCalledWith(
      new Error('spade version mismatch FE:13jkhjh3 BE:123')
    );
  });

  it('should not log version mismatch in server', () => {
    runtimeService.isBrowser.mockReturnValue(false);
    environment.version = '13jkhjh3';
    contentRetrieverMock.getContent.mockReturnValue(
      of({
        title: '',
        version: '123',
        content: mockContentBlocks,
        apiRequestId: ''
      })
    );
    fixture.detectChanges();
    expect(loggerService.error).not.toHaveBeenCalled();
  });

  it('should not log version mismatch when versions are equal', () => {
    runtimeService.isBrowser.mockReturnValue(true);
    contentRetrieverMock.getContent.mockReturnValue(
      of({
        title: '',
        version: 'SNAPSHOT',
        content: mockContentBlocks,
        apiRequestId: ''
      })
    );
    fixture.detectChanges();
    expect(loggerService.error).not.toHaveBeenCalled();
  });

  function assertsForSuccessfulRetrieval() {
    expect(component.contentBlocks).toHaveLength(mockContentBlocks.length);
    (component.contentBlocks as Array<{ type: string }>).forEach(
      (contentBlock) => {
        expect(contentBlock.type).toEqual('FakeContentBlock');
      }
    );

    expect(
      fixture.debugElement.queryAll(By.css('.app-fake-content-block'))
    ).toHaveLength(mockContentBlocks.length);
  }

  function assertsForFailedRetrieval() {
    expect(component.contentBlocks).toHaveLength(0);

    expect(
      fixture.debugElement.queryAll(By.css('.app-fake-content-block'))
    ).toHaveLength(0);
  }
});
