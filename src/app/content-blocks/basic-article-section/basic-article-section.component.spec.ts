import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { BasicArticleSectionComponent } from './basic-article-section.component';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicArticleSectionComponent);
    component = fixture.componentInstance;
  });

  it('should pass', () => {
    expect(1).toBe(1);
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
