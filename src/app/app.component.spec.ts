import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AdService } from './services/ad/ad.service';
import { mockService, ServiceMock } from './services/mocks/MockService';
import { DtmService } from './services/dtm/dtm.service';
import { AnalyticsService } from './services/analytics/analytics.service';
import { ExperimentService } from './services/experiment/experiment.service';
import { EventsService } from './services/events/events.service';
import { BrowserOverrideService } from './services/browser-override/browser-override.service';
import { NeighbourlyService } from './services/neighbourly/neighbourly.service';
import { MetaTagsService } from './services/meta-tags/meta-tags.service';

describe('AppComponent', () => {
  let adService: ServiceMock<AdService>;
  let eventsService: ServiceMock<EventsService>;
  let analyticsService: ServiceMock<AnalyticsService>;
  let dtmService: ServiceMock<DtmService>;
  let browserOverrideService: ServiceMock<BrowserOverrideService>;
  let experimentService: ServiceMock<ExperimentService>;
  let neighbourlyService: ServiceMock<NeighbourlyService>;
  let metaTagsService: ServiceMock<MetaTagsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: AdService,
          useClass: mockService(AdService)
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
          provide: DtmService,
          useClass: mockService(DtmService)
        },
        {
          provide: BrowserOverrideService,
          useClass: mockService(BrowserOverrideService)
        },
        {
          provide: ExperimentService,
          useClass: mockService(ExperimentService)
        },
        {
          provide: NeighbourlyService,
          useClass: mockService(NeighbourlyService)
        },
        {
          provide: MetaTagsService,
          useClass: mockService(MetaTagsService)
        }
      ]
    }).compileComponents();

    adService = TestBed.get(AdService);
    eventsService = TestBed.get(EventsService);
    analyticsService = TestBed.get(AnalyticsService);
    dtmService = TestBed.get(DtmService);
    browserOverrideService = TestBed.get(BrowserOverrideService);
    experimentService = TestBed.get(ExperimentService);
    neighbourlyService = TestBed.get(NeighbourlyService);
    metaTagsService = TestBed.get(MetaTagsService);
  });

  it('should create the app and set up services', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
    expect(adService.setup).toHaveBeenCalled();
    expect(eventsService.setup).toHaveBeenCalled();
    expect(analyticsService.setup).toHaveBeenCalled();
    expect(dtmService.setup).toHaveBeenCalled();
    expect(browserOverrideService.setup).toHaveBeenCalled();
    expect(experimentService.setup).toHaveBeenCalled();
    expect(neighbourlyService.setup).toHaveBeenCalled();
    expect(metaTagsService.setup).toHaveBeenCalled();
  }));

  it('should check router outlet is present', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  }));

  it('should setup data layer service before dtm service', () => {
    const serviceCallOrder: string[] = [];
    analyticsService.setup.mockImplementation(() => {
      serviceCallOrder.push('1');
    });
    dtmService.setup.mockImplementation(() => {
      serviceCallOrder.push('2');
      return null;
    });

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(serviceCallOrder).toEqual(['1', '2']);
  });
});
