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
import Test = jest.Test;

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  let contentRetrieverMock: ServiceMock<ContentRetrieverService>;
  let adServiceMock: ServiceMock<AdService>;
  let eventsServiceMock: ServiceMock<EventsService>;
  let anlyticsServiceMock: ServiceMock<AnalyticsService>;

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
    anlyticsServiceMock = TestBed.get(AnalyticsService);
  });

  afterEach(() => {
    jest.resetAllMocks();
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
      of({ title: '', content: mockContentBlocks, apiRequestId: '' })
    );

    component.getData();

    fixture.detectChanges(); // input updated
    assertsForSuccessfulRetrieval();
  });

  it('should render a list of content block when router navigates to "/"', () => {
    contentRetrieverMock.getContent.mockReturnValue(
      of({ title: '', content: mockContentBlocks, apiRequestId: '' })
    );
    const getDataSpy = jest.spyOn(component, 'getData');

    eventsServiceMock
      .getEventSubject()
      .NavigationStart.next(new NavigationStart(0, '/')); // emit an event before subscription
    expect(getDataSpy).not.toHaveBeenCalled();

    fixture.detectChanges(); // ngOnInit() and subscribe
    expect(getDataSpy).toBeCalledTimes(1);
    expect(contentRetrieverMock.getContent).toBeCalledTimes(1);

    eventsServiceMock
      .getEventSubject()
      .NavigationStart.next(new NavigationStart(0, '/')); // emit an event
    expect(getDataSpy).toBeCalledTimes(2);
    expect(contentRetrieverMock.getContent).toBeCalledTimes(2);
    fixture.detectChanges(); // input updated
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
      .NavigationStart.next(new NavigationStart(0, '/')); // emit an event before subscription
    expect(getDataSpy).not.toHaveBeenCalled();

    fixture.detectChanges(); // ngOnInit() and subscribe
    expect(getDataSpy).toHaveBeenCalled();
    expect(contentRetrieverMock.getContent).toHaveBeenCalled();

    eventsServiceMock
      .getEventSubject()
      .NavigationStart.next(new NavigationStart(0, '/')); // emit an event
    assertsForFailedRetrieval();
  });

  it('should dispatch DOM NavigationEnd when page finish render', () => {
    contentRetrieverMock.getContent.mockReturnValue(
      of({ title: '', content: mockContentBlocks, apiRequestId: '' })
    );
    component.getData();
    fixture.detectChanges(); // input updated
    expect(adServiceMock.notify).toHaveBeenCalled();
  });

  it('should post nielsen tracking record when the page rendering finishes', () => {
    contentRetrieverMock.getContent.mockReturnValue(
      of({ title: '', content: mockContentBlocks, apiRequestId: '' })
    );
    component.getData();
    fixture.detectChanges();
    expect(anlyticsServiceMock.trackPageByNielsen).toHaveBeenCalled();
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
