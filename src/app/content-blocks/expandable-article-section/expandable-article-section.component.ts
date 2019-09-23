import { Component, ElementRef, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';
import { IExpandableArticleSection } from '../../../../common/__types__/IExpandableArticleSection';
import { WindowService } from '../../services/window/window.service';

@Component({
  selector: 'app-expandable-article-section',
  templateUrl: './expandable-article-section.component.html',
  styleUrls: ['./expandable-article-section.component.scss']
})
export class ExpandableArticleSectionComponent
  implements IContentBlockComponent {
  @Input() input!: IExpandableArticleSection;
  showHiddenItems = false;
  height = 0;

  constructor(
    private analyticsService: AnalyticsService,
    private elementRef: ElementRef,
    private windowService: WindowService
  ) {}

  sendAnalytics() {
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.MORE_BUTTON_CLICKED,
      url: this.input.linkUrl!
    });
  }

  toggleHiddenItems() {
    if (this.showHiddenItems) {
      this.onCloseHiddenItems();
    }
    this.showHiddenItems = !this.showHiddenItems;
  }

  onCloseHiddenItems() {
    const moreButton = this.elementRef.nativeElement.querySelector(
      '.more-button'
    );
    const elementOffSetTop =
      moreButton.offsetTop - this.windowService.getWindow().scrollY;
    const startAnimationTime = Date.now();
    const endAnimationTime = startAnimationTime + 500;
    this.animateScroll(endAnimationTime, moreButton, elementOffSetTop);
  }

  animateScroll(
    endAnimationTime: number,
    element: any,
    elementOffSetTop: number
  ) {
    requestAnimationFrame(() => {
      this.windowService
        .getWindow()
        .scroll(0, element.offsetTop - elementOffSetTop);
      if (Date.now() <= endAnimationTime) {
        this.animateScroll(endAnimationTime, element, elementOffSetTop);
      }
    });
  }

  onResize(event: ResizeObserverEntry) {
    this.height = event.contentRect.height;
  }
}
