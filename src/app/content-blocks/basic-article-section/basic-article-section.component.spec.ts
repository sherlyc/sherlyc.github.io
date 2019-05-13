import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { BasicArticleSectionComponent } from './basic-article-section.component';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBasicArticleSection } from '../../../../common/__types__/IBasicArticleSection';
import { Section } from '../../../../server-src/services/section';
import { ContentBlockDirective } from '../../shared/directives/content-block/content-block.directive';
import { Component } from '@angular/core';
import registry from '../content-blocks.registry';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { By, TransferState } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';

describe('basic article section', () => {
  let component: BasicArticleSectionComponent;
  let fixture: ComponentFixture<BasicArticleSectionComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  // @ts-ignore
  const input = {
    type: 'FakeContentBlock'
  } as IContentBlock;

  @Component({
    selector: 'app-fake-content-block',
    template: ''
  })
  class FakeContentBlockComponent {}

  const sectionData: IBasicArticleSection = {
    type: ContentBlockType.BasicArticleSection,
    displayName: 'National',
    displayNameColor: 'toreabay',
    linkUrl: '/' + Section.National,
    items: [input, input, input, input]
  };

  beforeEach(async () => {
    // @ts-ignore
    registry['FakeContentBlockComponent'] = FakeContentBlockComponent;
    await TestBed.configureTestingModule({
      declarations: [
        BasicArticleSectionComponent,
        FakeContentBlockComponent,
        ContentBlockDirective
      ],
      providers: [
        TransferState,
        {
          provide: AnalyticsService,
          useClass: mockService(AnalyticsService)
        },
        {
          provide: TransferState,
          useClass: mockService(TransferState)
        }
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [FakeContentBlockComponent]
        }
      })
      .compileComponents();

    analyticsService = TestBed.get(AnalyticsService);
    fixture = TestBed.createComponent(BasicArticleSectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section headline as link when linkUrl is provided', () => {
    const sectionArticleData: IBasicArticleSection = {
      type: ContentBlockType.BasicArticleSection,
      displayName: `National`,
      displayNameColor: 'scarlet',
      linkUrl: '/national',
      items: []
    };

    component.input = sectionArticleData;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.headlineLink'))).toBeTruthy();
  });

  it('should not render section headline as link when linkUrl is not provided', () => {
    const sectionArticleData: IBasicArticleSection = {
      type: ContentBlockType.BasicArticleSection,
      displayName: `Editor's Pick`,
      displayNameColor: 'scarlet',
      items: []
    };

    component.input = sectionArticleData;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.headlineLink'))).toBeFalsy();
  });

  it('should render more button when linkUrl is provided', () => {
    const sectionArticleData: IBasicArticleSection = {
      type: ContentBlockType.BasicArticleSection,
      displayName: `National`,
      displayNameColor: 'scarlet',
      linkUrl: '/national',
      items: []
    };

    component.input = sectionArticleData;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.more'))).toBeTruthy();
  });

  it('should not render more button when linkUrl is not provided', () => {
    const sectionArticleData: IBasicArticleSection = {
      type: ContentBlockType.BasicArticleSection,
      displayName: `Editor's Pick`,
      displayNameColor: 'scarlet',
      items: []
    };

    component.input = sectionArticleData;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.more'))).toBeFalsy();
  });

  it('button should show the text `More National`', () => {
    component.input = sectionData;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.more')).nativeElement.textContent
    ).toBe('More National');
  });

  it('should send right analytics when button `More National` is clicked', () => {
    component.input = sectionData;
    fixture.detectChanges();

    fixture.debugElement.query(By.css('.more')).nativeElement.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith(
      AnalyticsEventsType.MORE_BUTTON_CLICKED,
      new Map().set('url', '/national')
    );
  });
});
