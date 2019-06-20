import { Component, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IBasicArticleTitleUnit } from '../../../../common/__types__/IBasicArticleTitleUnit';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { AnalyticsEventsType } from '../../services/analytics/__types__/AnalyticsEventsType';

@Component({
  selector: 'app-basic-article-title-unit',
  templateUrl: './basic-article-title-unit.html',
  styleUrls: ['./basic-article-title-unit.scss']
})
export class BasicArticleTitleUnitComponent implements IContentBlockComponent {
  @Input() input!: IBasicArticleTitleUnit;
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
