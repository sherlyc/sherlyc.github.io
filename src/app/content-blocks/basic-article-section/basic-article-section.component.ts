import { Component, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IBasicArticleSection } from '../../../../common/__types__/IBasicArticleSection';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';

@Component({
  selector: 'app-basic-article-section',
  templateUrl: './basic-article-section.component.html',
  styleUrls: ['./basic-article-section.component.scss']
})
export class BasicArticleSectionComponent implements IContentBlockComponent {
  @Input() input!: IBasicArticleSection;

  constructor(private analyticsService: AnalyticsService) {}

  sendAnalytics() {
    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.MORE_BUTTON_CLICKED,
      url: this.input.linkUrl!
    });
  }
}
