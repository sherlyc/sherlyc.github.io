import { BasicArticleTitleUnitComponent } from './basic-article-title-unit.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { HeadlineComponent } from '../../shared/components/headline/headline.component';
import { By } from '@angular/platform-browser';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { mockService, ServiceMock } from 'src/app/services/mocks/MockService';
import { AnalyticsEventsType } from 'src/app/services/analytics/__types__/AnalyticsEventsType';
import { TimeAgoComponent } from '../../shared/components/time-ago/time-ago.component';
import { HeadlineFlagComponent } from '../../shared/components/headline-flag/headline-flag.component';
import { HeadlineFlags } from '../../../../common/HeadlineFlags';
import { FeatureSwitchService } from '../../services/feature-switch/feature-switch.service';

describe('BasicArticleTitleUnitComponent', () => {
  let component: BasicArticleTitleUnitComponent;
  let fixture: ComponentFixture<BasicArticleTitleUnitComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [BasicArticleTitleUnitComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        },
        {
          provide: FeatureSwitchService,
          useClass: mockService(FeatureSwitchService)
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(BasicArticleTitleUnitComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.get(AnalyticsService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render headline in headline component with correct inputs', () => {
    const headline = 'Headline';
    const headlineFlags = [HeadlineFlags.PHOTO];
    const timeStamp = 1;
    component.input = {
      type: ContentBlockType.BasicArticleTitleUnit,
      id: '123123123',
      strapName: 'Top stories',
      indexHeadline: headline,
      title: 'Title',
      linkUrl: '/headline/top-news',
      headlineFlags,
      lastPublishedTime: timeStamp
    };
    fixture.detectChanges();

    const headlineComponent = fixture.debugElement.query(
      By.directive(HeadlineComponent)
    );
    expect(headlineComponent.nativeElement.textContent).toEqual(headline);
    expect(headlineComponent.componentInstance).toHaveProperty(
      'headline',
      headline
    );
    expect(headlineComponent.componentInstance).toHaveProperty(
      'headlineFlags',
      headlineFlags
    );
    expect(headlineComponent.componentInstance).toHaveProperty(
      'timeStamp',
      timeStamp
    );
  });

  it('should render anchor tag with correct linkUrl', () => {
    const linkUrl = '/headline/top-news';
    component.input = {
      type: ContentBlockType.BasicArticleTitleUnit,
      id: '123123123',
      indexHeadline: 'Headline',
      title: 'Title',
      strapName: 'Top stories',
      linkUrl,
      headlineFlags: [],
      lastPublishedTime: 1
    };
    fixture.detectChanges();

    const anchorTag = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(anchorTag.href).toEqual(`http://localhost${linkUrl}`);
  });

  it('should send analytics when clicked', () => {
    const linkUrl = '/national/top-news';
    const strapName = 'National';
    const indexHeadline = 'Headline';
    const articleId = '123123123';
    component.input = {
      type: ContentBlockType.BasicArticleTitleUnit,
      id: articleId,
      strapName,
      indexHeadline,
      title: 'Title',
      linkUrl,
      headlineFlags: [],
      lastPublishedTime: 1
    };
    fixture.detectChanges();

    const anchorTag = fixture.debugElement.query(By.css('a')).nativeElement;
    anchorTag.click();
    expect(analyticsService.pushEvent).toBeCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: indexHeadline,
      articleId: articleId
    });
  });
});
