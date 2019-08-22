import { Component, Input, OnInit } from '@angular/core';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';

@Component({
  selector: 'app-half-width-image-article-unit',
  templateUrl: './half-width-image-article-unit.component.html',
  styleUrls: ['./half-width-image-article-unit.component.scss']
})
export class HalfWidthImageArticleUnitComponent
  implements IContentBlockComponent {
  @Input() input!: IBasicArticleUnit;
  index!: number;

  constructor(private analyticsService: AnalyticsService) {}

  sendAnalytics() {
    const { strapName, indexHeadline, id } = this.input;

    this.analyticsService.pushEvent({
      type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED,
      strapName,
      articleHeadline: indexHeadline,
      articleId: id
    });
  }
}
