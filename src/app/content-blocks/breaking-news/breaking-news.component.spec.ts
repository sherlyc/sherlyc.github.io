import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakingNewsComponent } from './breaking-news.component';
import { By } from '@angular/platform-browser';
import { CookieService } from '../../services/cookie/cookie.service';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';
import { AnalyticsService } from '../../services/analytics/analytics.service';

describe('BreakingNewsComponent', () => {
  let component: BreakingNewsComponent;
  let fixture: ComponentFixture<BreakingNewsComponent>;
  let cookieServiceMock: ServiceMock<CookieService>;
  let analyticsService: ServiceMock<AnalyticsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreakingNewsComponent],
      providers: [
        {
          provide: CookieService,
          useClass: mockService(CookieService)
        },
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    }).compileComponents();
    cookieServiceMock = TestBed.get(CookieService);
    analyticsService = TestBed.get(AnalyticsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakingNewsComponent);
    component = fixture.componentInstance;

    component.input = {
      type: ContentBlockType.BreakingNews,
      id: 'whatever',
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

  it('should show breaking news', async () => {
    expect(fixture.debugElement.query(By.css('.breaking-news'))).toBeTruthy();
  });

  it('should disappear when dismiss button is clicked', () => {
    fixture.debugElement.query(By.css('.dismiss')).nativeElement.click();
    fixture.detectChanges();

    expect(component.onClickOrDismiss).toHaveBeenCalled();
    expect(cookieServiceMock.set).toHaveBeenCalled();
    expect(fixture.debugElement.query(By.css('.breaking-news'))).toBeFalsy();
  });

  it('should disappear when the link is clicked', () => {
    fixture.debugElement.query(By.css('.link')).nativeElement.click();
    fixture.detectChanges();

    expect(component.onClickOrDismiss).toHaveBeenCalled();
    expect(cookieServiceMock.set).toHaveBeenCalled();
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
