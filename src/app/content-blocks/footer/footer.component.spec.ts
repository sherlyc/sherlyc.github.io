import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';
import { CopyrightComponent } from '../../shared/components/copyright/copyright.component';
import { AnalyticsService } from 'src/app/services/data-layer/analytics.service';
import { mockService, ServiceMock } from 'src/app/services/mocks/MockService';

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
      event: 'menu.footer',
      'menu.link': 'Twitter'
    });
  });
});
