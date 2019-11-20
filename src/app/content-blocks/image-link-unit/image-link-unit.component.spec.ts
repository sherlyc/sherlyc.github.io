import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageLinkUnitComponent } from './image-link-unit.component';
import { IImageLinkUnit } from '../../../../common/__types__/IImageLinkUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { By } from '@angular/platform-browser';
import { AnalyticsEventsType } from 'src/app/services/analytics/__types__/AnalyticsEventsType';
import { mockService, ServiceMock } from 'src/app/services/mocks/MockService';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { SharedModule } from '../../shared/shared.module';
import { HeadlineComponent } from '../../shared/components/headline/headline.component';
import { HeadlineFlags } from '../../../../common/HeadlineFlags';
import { FeatureSwitchService } from '../../services/feature-switch/feature-switch.service';

describe('ImageLinkUnitComponent', () => {
  let component: ImageLinkUnitComponent;
  let fixture: ComponentFixture<ImageLinkUnitComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const articleData: IImageLinkUnit = {
    type: ContentBlockType.ImageLinkUnit,
    id: '123123',
    strapName: 'National',
    indexHeadline: 'Dummy Headline',
    title: 'Title Headline',
    linkUrl: 'https://dummyurl.com',
    imageSrc: 'https://dummyimagesrc.com',
    imageSrcSet: 'https://dummyimagesrc.com 1w',
    headlineFlags: []
  };

  beforeEach(async () =>
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ImageLinkUnitComponent],
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
    }).compileComponents()
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLinkUnitComponent);
    component = fixture.componentInstance;
    analyticsService = TestBed.get(AnalyticsService);
  });

  it('should create', () => {
    component.input = articleData;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render input data', async () => {
    component.input = articleData;

    fixture.detectChanges();

    const componentElement: HTMLElement = fixture.debugElement.nativeElement;
    const a = componentElement.querySelector('a');

    expect(a!.getAttribute('href')).toEqual(articleData.linkUrl);

    const h3 = componentElement.querySelector('h3');
    expect(h3!.textContent).toEqual(articleData.indexHeadline);

    const img = componentElement.querySelector('img');
    expect(img!.getAttribute('src')).toEqual(articleData.imageSrc);
    expect(img!.getAttribute('srcset')).toEqual(articleData.imageSrcSet);
    expect(img!.getAttribute('alt')).toEqual(articleData.indexHeadline);
  });

  it('should hide image if not available', async () => {
    component.input = { ...articleData, imageSrc: null };

    fixture.detectChanges();
    const componentElement: HTMLElement = fixture.debugElement.nativeElement;
    const img = componentElement.querySelector('img');
    expect(img).toBeFalsy();
  });

  it('should send analytics when clicked', () => {
    const { strapName, title, id } = articleData;
    component.input = articleData;

    fixture.detectChanges();

    const anchorTag = fixture.debugElement.query(By.css('a')).nativeElement;
    anchorTag.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: title,
      articleId: id
    });
  });

  it('should pass correct inputs to headline component', () => {
    articleData.headlineFlags = [HeadlineFlags.PHOTO];
    component.input = articleData;

    fixture.detectChanges();

    const headline = fixture.debugElement.query(By.directive(HeadlineComponent))
      .componentInstance;

    expect(headline).toHaveProperty('headline', articleData.indexHeadline);
    expect(headline).toHaveProperty('headlineFlags', articleData.headlineFlags);
    expect(headline).not.toHaveProperty('timeStamp');
  });
});
