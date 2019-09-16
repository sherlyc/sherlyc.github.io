import { Component, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';
import { IExpandableArticleSection } from '../../../../common/__types__/IExpandableArticleSection';

@Component({
  selector: 'app-expandable-article-section',
  templateUrl: './expandable-article-section.component.html',
  styleUrls: ['./expandable-article-section.component.scss']
})
export class ExpandableArticleSectionComponent
  implements IContentBlockComponent {
  @Input() input!: IExpandableArticleSection;
  showHiddenItems = false;

  constructor(private analyticsService: AnalyticsService) {}

  sendAnalytics() {
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.MORE_BUTTON_CLICKED,
      url: this.input.linkUrl!
    });
  }

  toggleHiddenItems() {
    this.showHiddenItems = !this.showHiddenItems;
  }
}
