import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicArticleUnitComponent } from './basic-article-unit.component';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { mockService, ServiceMock } from 'src/app/services/mocks/MockService';
import { By } from '@angular/platform-browser';
import { AnalyticsEventsType } from 'src/app/services/analytics/__types__/AnalyticsEventsType';

describe('BasicArticleUnitComponent', () => {
  let component: BasicArticleUnitComponent;
  let fixture: ComponentFixture<BasicArticleUnitComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  const twoDaysAgoDateInSeconds =
    new Date().setDate(new Date().getDate() - 2) / 1000;

  const articleData: IBasicArticleUnit = {
    type: ContentBlockType.BasicArticleUnit,
    id: '123123',
    strapName: 'National',
    indexHeadline: 'Dummy Headline',
    introText: 'Dummy intro text',
    linkUrl: 'https://dummyurl.com',
    imageSrc: 'https://dummyimagesrc.com',
    imageSrcSet: 'https://dummyimagesrc.com 1w',
    lastPublishedTime: twoDaysAgoDateInSeconds,
    headlineFlags: []
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [BasicArticleUnitComponent],
      providers: [
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicArticleUnitComponent);
    analyticsService = TestBed.get(AnalyticsService);
    component = fixture.componentInstance;
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

    const span = componentElement.querySelector('p span');
    expect(span!.textContent).toEqual('');
  });

  it('should send analytics when clicked', () => {
    const { strapName, indexHeadline, id } = articleData;
    component.input = articleData;
    fixture.detectChanges();

    const anchorTag = fixture.debugElement.query(By.css('a')).nativeElement;
    anchorTag.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: indexHeadline,
      articleId: id
    });
  });
});
