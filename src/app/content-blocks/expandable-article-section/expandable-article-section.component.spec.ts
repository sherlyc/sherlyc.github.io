import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { ExpandableArticleSectionComponent } from './expandable-article-section.component';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { ContentBlockDirective } from '../../shared/directives/content-block/content-block.directive';
import { Component } from '@angular/core';
import registry from '../content-blocks.registry';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { By, TransferState } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { OpenExternalLinkDirective } from '../../shared/directives/open-external-link/open-external-link.directive';
import { IExpandableArticleSection } from '../../../../common/__types__/IExpandableArticleSection';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';

describe('expandable article section', () => {
  let component: ExpandableArticleSectionComponent;
  let fixture: ComponentFixture<ExpandableArticleSectionComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;

  // @ts-ignore
  const visibleBlock = {
    type: 'FakeVisibleBlock'
  } as IContentBlock;

  @Component({
    selector: 'app-fake-visible-block',
    template: ''
  })
  class FakeVisibleBlockComponent {}

  // @ts-ignore
  const hiddenBlock = {
    type: 'FakeHiddenBlock'
  } as IContentBlock;

  @Component({
    selector: 'app-fake-hidden-block',
    template: ''
  })
  class FakeHiddenBlockComponent {}

  const sectionArticleData: IExpandableArticleSection = {
    type: ContentBlockType.ExpandableArticleSection,
    displayName: `National`,
    displayNameColor: 'scarlet',
    visibleItems: [],
    hiddenItems: [],
    linkUrl: '/national'
  };

  beforeEach(async () => {
    // @ts-ignore
    registry['FakeVisibleBlockComponent'] = FakeVisibleBlockComponent;
    // @ts-ignore
    registry['FakeHiddenBlockComponent'] = FakeHiddenBlockComponent;
    await TestBed.configureTestingModule({
      declarations: [
        OpenExternalLinkDirective,
        ExpandableArticleSectionComponent,
        FakeVisibleBlockComponent,
        FakeHiddenBlockComponent,
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
          entryComponents: [FakeVisibleBlockComponent, FakeHiddenBlockComponent]
        }
      })
      .compileComponents();

    analyticsService = TestBed.get(AnalyticsService);
    fixture = TestBed.createComponent(ExpandableArticleSectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section headline as link when linkUrl is provided', () => {
    component.input = sectionArticleData;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.headline-link'))).toBeTruthy();
  });

  it('should not render section headline as link when linkUrl is not provided', () => {
    component.input = { ...sectionArticleData, linkUrl: undefined };
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.headline-link'))).toBeFalsy();
  });

  it('should render more button', () => {
    component.input = sectionArticleData;
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.more-button')).nativeElement
        .textContent
    ).toContain('More National');
  });

  it('should send right analytics when button `More National` is clicked', () => {
    component.input = sectionArticleData;
    fixture.detectChanges();

    fixture.debugElement.query(By.css('.more-button')).nativeElement.click();

    expect(analyticsService.pushEvent).toHaveBeenCalledWith({
      type: AnalyticsEventsType.MORE_BUTTON_CLICKED,
      url: '/national'
    });
  });

  it('should only display visibleItems', () => {
    component.input = {
      ...sectionArticleData,
      visibleItems: [visibleBlock, visibleBlock],
      hiddenItems: [hiddenBlock, hiddenBlock]
    };
    fixture.detectChanges();

    const visibleBlocks = fixture.debugElement.queryAll(
      By.css('app-fake-visible-block')
    );

    expect(visibleBlocks.length).toEqual(2);
  });

  it('should hide hiddenItems initially', () => {
    component.input = {
      ...sectionArticleData,
      visibleItems: [visibleBlock, visibleBlock],
      hiddenItems: [hiddenBlock, hiddenBlock]
    };
    fixture.detectChanges();

    const hiddenBlocks = fixture.debugElement.queryAll(
      By.css('app-fake-hidden-block')
    );

    expect(hiddenBlocks.length).toEqual(0);
  });

  it('should show hiddenItems when clicking More button', () => {
    component.input = {
      ...sectionArticleData,
      visibleItems: [visibleBlock, visibleBlock],
      hiddenItems: [hiddenBlock, hiddenBlock]
    };
    fixture.detectChanges();

    const hiddenBlocksBeforeClick = fixture.debugElement.queryAll(
      By.css('app-fake-hidden-block')
    );
    expect(hiddenBlocksBeforeClick.length).toEqual(0);
    fixture.debugElement.query(By.css('.more-button')).nativeElement.click();
    fixture.detectChanges();

    const hiddenBlocksAfterClick = fixture.debugElement.queryAll(
      By.css('app-fake-hidden-block')
    );
    expect(hiddenBlocksAfterClick.length).toEqual(2);
  });

  it('should hide hiddenItems when clicking Less button', () => {
    component.input = {
      ...sectionArticleData,
      hiddenItems: [hiddenBlock, hiddenBlock]
    };
    component.showHiddenItems = true;
    fixture.detectChanges();

    const hiddenBlocksBeforeClick = fixture.debugElement.queryAll(
      By.css('app-fake-hidden-block')
    );
    expect(hiddenBlocksBeforeClick.length).toEqual(2);
    fixture.debugElement.query(By.css('.more-button')).nativeElement.click();
    fixture.detectChanges();

    const hiddenBlocksAfterClick = fixture.debugElement.queryAll(
      By.css('app-fake-hidden-block')
    );
    expect(hiddenBlocksAfterClick.length).toEqual(0);
  });

  it('button should change from showing More to Less after clicking More button', () => {
    component.input = sectionArticleData;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.more-button'));
    expect(button.nativeElement.textContent).toContain(
      `More ${sectionArticleData.displayName}`
    );
    button.nativeElement.click();
    fixture.detectChanges();

    expect(button.nativeElement.textContent).toContain(
      `Less ${sectionArticleData.displayName}`
    );
  });

  it('should change component height when onResize is triggered', () => {
    component.input = sectionArticleData;
    fixture.detectChanges();

    const mockResizeObserverEntry = {
      contentRect: {
        height: 100
      } as any
    } as ResizeObserverEntry;
    component.onResize(mockResizeObserverEntry);
    fixture.detectChanges();

    expect(component.height).toEqual(100);
  });
});
