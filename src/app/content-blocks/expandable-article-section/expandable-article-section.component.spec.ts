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
import { WindowService } from '../../services/window/window.service';

describe('expandable article section', () => {
  let component: ExpandableArticleSectionComponent;
  let fixture: ComponentFixture<ExpandableArticleSectionComponent>;
  let analyticsService: ServiceMock<AnalyticsService>;
  let windowService: ServiceMock<WindowService>;

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
    windowService = TestBed.get(WindowService);
    fixture = TestBed.createComponent(ExpandableArticleSectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render section headline as link', () => {
    component.input = sectionArticleData;
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.headline-link'))).toBeTruthy();
  });

  it('should render more button', () => {
    component.input = { ...sectionArticleData, hiddenItems: [hiddenBlock] };
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.more-button')).nativeElement
        .textContent
    ).toContain('More National');
  });

  it('should hide More button when hiddenItems are empty', () => {
    component.input = sectionArticleData;
    fixture.detectChanges();

    const moreButton = fixture.debugElement.query(By.css('.more-button'));

    expect(moreButton).toBeFalsy();
  });

  it('should send analytics with url when More button is clicked', () => {
    component.input = { ...sectionArticleData, hiddenItems: [hiddenBlock] };
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

    const allHiddenBlocks = fixture.debugElement.queryAll(
      By.css('app-fake-hidden-block')
    );
    const hiddenBlocksInMoreContent = fixture.debugElement.queryAll(
      By.css('.more-content > div > app-fake-hidden-block')
    );
    const moreContent = fixture.debugElement.query(By.css('.more-content'));

    expect(hiddenBlocksInMoreContent.length).toEqual(allHiddenBlocks.length);
    expect(moreContent.styles['height']).toEqual('0px');
  });

  it('should show hiddenItems when More button is clicked', () => {
    component.input = {
      ...sectionArticleData,
      visibleItems: [visibleBlock, visibleBlock],
      hiddenItems: [hiddenBlock, hiddenBlock]
    };
    component.showHiddenItems = false;
    fixture.detectChanges();

    const moreContentBeforeClick = fixture.debugElement.query(
      By.css('.more-content')
    );
    expect(moreContentBeforeClick.styles['height']).toEqual('0px');
    fixture.debugElement.query(By.css('.more-button')).nativeElement.click();
    component.height = 100;
    fixture.detectChanges();

    const moreContentAfterClick = fixture.debugElement.query(
      By.css('.more-content')
    );
    expect(moreContentAfterClick.styles['height']).toEqual('100px');
  });

  it('should hide hiddenItems when Less button is clicked', () => {
    component.input = {
      ...sectionArticleData,
      visibleItems: [visibleBlock, visibleBlock],
      hiddenItems: [hiddenBlock, hiddenBlock]
    };
    component.height = 100;
    component.showHiddenItems = true;
    fixture.detectChanges();

    const moreContentBeforeClick = fixture.debugElement.query(
      By.css('.more-content')
    );
    expect(moreContentBeforeClick.styles['height']).toEqual('100px');
    fixture.debugElement.query(By.css('.more-button')).nativeElement.click();
    fixture.detectChanges();

    const moreContentAfterClick = fixture.debugElement.query(
      By.css('.more-content')
    );
    expect(moreContentAfterClick.styles['height']).toEqual('0px');
  });

  it('button text should change from More to Less after clicking it', () => {
    component.input = { ...sectionArticleData, hiddenItems: [hiddenBlock] };
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

  it('should set height of more content container when it is shown', () => {
    component.input = sectionArticleData;
    component.showHiddenItems = true;
    component.height = 50;
    fixture.detectChanges();

    const moreContentDivStyles = fixture.debugElement.query(
      By.css('.more-content')
    ).styles;

    expect(moreContentDivStyles['height']).toEqual('50px');
  });

  it('should default to 0 height for more content container when it is hidden', () => {
    component.input = sectionArticleData;
    component.showHiddenItems = false;
    fixture.detectChanges();

    const moreContentDivStyles = fixture.debugElement.query(
      By.css('.more-content')
    ).styles;

    expect(moreContentDivStyles['height']).toEqual('0px');
  });

  it('should call onCloseHiddenItems to animate after clicking Less button', () => {
    component.input = { ...sectionArticleData, hiddenItems: [hiddenBlock] };
    component.showHiddenItems = true;
    fixture.detectChanges();
    jest.spyOn(component, 'onCloseHiddenItems');

    fixture.debugElement.query(By.css('.more-button')).nativeElement.click();

    expect(component.onCloseHiddenItems).toHaveBeenCalledTimes(1);
  });

  it('should not call onCloseHiddenItems to animate after clicking More button', () => {
    component.input = { ...sectionArticleData, hiddenItems: [hiddenBlock] };
    component.showHiddenItems = false;
    fixture.detectChanges();
    jest.spyOn(component, 'onCloseHiddenItems');

    fixture.debugElement.query(By.css('.more-button')).nativeElement.click();

    expect(component.onCloseHiddenItems).not.toHaveBeenCalled();
  });

  it('should call animateScroll when onCloseHiddenItems is triggered', () => {
    component.input = { ...sectionArticleData, hiddenItems: [hiddenBlock] };
    component.showHiddenItems = true;
    fixture.detectChanges();
    jest.spyOn(component, 'animateScroll');

    component.onCloseHiddenItems();

    expect(component.animateScroll).toHaveBeenCalled();
  });
});