import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AdService } from './services/ad/ad.service';
import { mockService, ServiceMock } from './services/mocks/MockService';
import { DtmService } from './services/dtm/dtm.service';
import { AnalyticsService } from './services/data-layer/analytics.service';

describe('AppComponent', () => {
  let dataLayerService: ServiceMock<AnalyticsService>;
  let dtmService: ServiceMock<DtmService>;

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
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        },
        {
          provide: DtmService,
          useClass: mockService(DtmService)
        }
      ]
    }).compileComponents();

    dataLayerService = TestBed.get(AnalyticsService);
    dtmService = TestBed.get(DtmService);
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should check router outlet is present', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  }));

  it('should setup data layer service before dtm service', () => {
    const serviceCallOrder: string[] = [];
    dataLayerService.setup.mockImplementation(() => {
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
