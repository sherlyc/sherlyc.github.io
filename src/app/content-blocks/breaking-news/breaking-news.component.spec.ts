import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakingNewsComponent } from './breaking-news.component';
import { By } from '@angular/platform-browser';
import { CookieService } from '../../services/cookie/cookie.service';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { StorageKeys, StoreService } from '../../services/store/store.service';

describe('BreakingNewsComponent', () => {
  const breakingNewsId = 'whatever';
  let component: BreakingNewsComponent;
  let fixture: ComponentFixture<BreakingNewsComponent>;
  let cookieServiceMock: ServiceMock<CookieService>;
  let analyticsService: ServiceMock<AnalyticsService>;
  let storeService: ServiceMock<StoreService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreakingNewsComponent],
      providers: [
        {
          provide: CookieService,
          useClass: mockService(CookieService)
        },
        {
          provide: StoreService,
          useClass: mockService(StoreService)
        },
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    }).compileComponents();
    cookieServiceMock = TestBed.get(CookieService);
    analyticsService = TestBed.get(AnalyticsService);
    storeService = TestBed.get(StoreService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakingNewsComponent);
    component = fixture.componentInstance;

    component.input = {
      type: ContentBlockType.BreakingNews,
      id: breakingNewsId,
      text: 'breaking_news_text',
      link: 'breaking_news_link',
      variant: 'orangeHeadline'
    };
    fixture.detectChanges();
    jest.spyOn(component, 'onClickOrDismiss');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show breaking news if has not been dismissed', async () => {
    (storeService.get as jest.Mock).mockReturnValue(null);
    (cookieServiceMock.get as jest.Mock).mockReturnValue(null);

    await component.ngOnInit();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.breaking-news'))).toBeTruthy();
  });

  it('should show breaking news if it is a new breaking news', async () => {
    (storeService.get as jest.Mock).mockReturnValue('oldBreakingNews');
    (cookieServiceMock.get as jest.Mock).mockReturnValue('oldBreakingNews');

    await component.ngOnInit();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.breaking-news'))).toBeTruthy();
  });

  it('should hide breaking news if has been dismissed in spade and storage id matches current breaking new id', async () => {
    (storeService.get as jest.Mock).mockReturnValue(breakingNewsId);
    (cookieServiceMock.get as jest.Mock).mockReturnValue(null);

    await component.ngOnInit();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.breaking-news'))).toBeFalsy();
  });

  it(
    'should hide breaking news if has been dismissed in other applications (eg: Article page - sics) and ' +
      'cookies id matches current breaking news id',
    async () => {
      (storeService.get as jest.Mock).mockReturnValue(null);
      (cookieServiceMock.get as jest.Mock).mockReturnValue(breakingNewsId);

      await component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.breaking-news'))).toBeFalsy();
    }
  );

  it('should hide breaking news if both breaking new id in local storage and cookies match current breaking news id', async () => {
    (storeService.get as jest.Mock).mockReturnValue(breakingNewsId);
    (cookieServiceMock.get as jest.Mock).mockReturnValue(breakingNewsId);

    await component.ngOnInit();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.breaking-news'))).toBeFalsy();
  });

  it(
    'should hide breaking news when breaking new id in other applications matches current breaking news id ' +
      'but id in spade does not match',
    async () => {
      (storeService.get as jest.Mock).mockReturnValue('doesNotMatchId');
      (cookieServiceMock.get as jest.Mock).mockReturnValue(breakingNewsId);

      await component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.breaking-news'))).toBeFalsy();
    }
  );

  it(
    'should hide breaking news when breaking new id in spade matches current breaking news id ' +
      'but id in other applications does not match',
    async () => {
      (storeService.get as jest.Mock).mockReturnValue(breakingNewsId);
      (cookieServiceMock.get as jest.Mock).mockReturnValue('doesNotMatchId');

      await component.ngOnInit();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('.breaking-news'))).toBeFalsy();
    }
  );

  it('should disappear when dismiss button is clicked', () => {
    fixture.debugElement.query(By.css('.dismiss')).nativeElement.click();
    fixture.detectChanges();

    expect(component.onClickOrDismiss).toHaveBeenCalled();
    expect(cookieServiceMock.set).toHaveBeenCalled();
    expect(storeService.set).toHaveBeenCalledWith(
      StorageKeys.BreakingNewsId,
      breakingNewsId
    );
    expect(fixture.debugElement.query(By.css('.breaking-news'))).toBeFalsy();
  });

  it('should disappear when the link is clicked', () => {
    fixture.debugElement.query(By.css('.link')).nativeElement.click();
    fixture.detectChanges();

    expect(component.onClickOrDismiss).toHaveBeenCalled();
    expect(cookieServiceMock.set).toHaveBeenCalled();
    expect(storeService.set).toHaveBeenCalledWith(
      StorageKeys.BreakingNewsId,
      breakingNewsId
    );
    expect(fixture.debugElement.query(By.css('.breaking-news'))).toBeFalsy();
  });

  describe('Analytics', () => {
    it('should push analytics event when opening the breaking news link', () => {
      fixture.debugElement.query(By.css('.link')).nativeElement.click();

      expect(analyticsService.pushEvent).toHaveBeenCalledWith(
        AnalyticsEventsType.BREAKING_NEWS_OPEN
      );
    });

    it('should push analytics event when closing breaking news', () => {
      fixture.debugElement.query(By.css('.dismiss')).nativeElement.click();

      expect(analyticsService.pushEvent).toHaveBeenCalledWith(
        AnalyticsEventsType.BREAKING_NEWS_CLOSE
      );
    });
  });
});
