import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';
import { CopyrightComponent } from '../../shared/components/copyright/copyright.component';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { mockService, ServiceMock } from '../../services/mocks/MockService';

describe('Footer', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent, CopyrightComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(FooterComponent);
    analyticsService = TestBed.get(AnalyticsService);
  });

  it('push analytics event when twitter link is clicked', () => {
    fixture.debugElement
      .query(By.css('a[aria-label="Twitter"]'))
      .nativeElement.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.FOOTER_MENU_CLICKED,
      name: 'Twitter'
    });
  });

  it('push analytics event when Facebook link is clicked', () => {
    fixture.debugElement
      .query(By.css('a[aria-label="Facebook"]'))
      .nativeElement.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.FOOTER_MENU_CLICKED,
      name: 'Facebook'
    });
  });

  it('push analytics event when Snapchat link is clicked', () => {
    fixture.debugElement
      .query(By.css('a[aria-label="Snapchat"]'))
      .nativeElement.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.FOOTER_MENU_CLICKED,
      name: 'Snapchat'
    });
  });
});
